import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Communities from './pages/Communities';
import Profile from './pages/Profile';
import Help from './pages/Help';
import { ItemDetailModal, ListingCreateModal, ChatModal, CreatePostModal, CreateEventModal } from './components/Modals';
import { useSession } from './context/SessionContext';
import { Check, Info } from 'lucide-react';

export default function App() {
  const [page, setPage] = useState('home');
  const [modal, setModal] = useState(null); // { type, data }
  const { toasts } = useSession();

  const navigate = (target) => {
    if (target === 'create') {
      setModal({ type: 'create' });
    } else if (target === 'createPost') {
      setModal({ type: 'createPost', data: null });
    } else if (typeof target === 'object' && target.type === 'createPost') {
      setModal({ type: 'createPost', data: target.communityId });
    } else if (typeof target === 'object' && target.type === 'createEvent') {
      setModal({ type: 'createEvent', data: target.communityId });
    } else {
      setPage(target);
      setModal(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openItem = (item) => setModal({ type: 'detail', data: item });
  const openChat = (item) => setModal({ type: 'chat', data: item });
  const closeModal = () => setModal(null);

  return (
    <>
      <Navbar activePage={page} onNavigate={navigate} />

      <main style={{ minHeight: '80vh' }}>
        {page === 'home' && <Home onNavigate={navigate} />}
        {page === 'marketplace' && <Marketplace onItemClick={openItem} onChat={openChat} onNavigate={navigate} />}
        {page === 'communities' && <Communities onNavigate={navigate} />}
        {page === 'profile' && <Profile onNavigate={navigate} />}
        {page === 'help' && <Help />}
      </main>

      {/* Modals */}
      {modal?.type === 'detail' && (
        <ItemDetailModal item={modal.data} onClose={closeModal} onChat={openChat} />
      )}
      {modal?.type === 'create' && (
        <ListingCreateModal onClose={closeModal} />
      )}
      {modal?.type === 'chat' && (
        <ChatModal item={modal.data} onClose={closeModal} />
      )}
      {modal?.type === 'createPost' && (
        <CreatePostModal communityId={modal.data} onClose={closeModal} />
      )}
      {modal?.type === 'createEvent' && (
        <CreateEventModal communityId={modal.data} onClose={closeModal} />
      )}

      {/* Toast Notifications */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className={`toast ${toast.type}`}>
              <div className={`toast-icon ${toast.type}`}>
                {toast.type === 'success' ? <Check size={14} /> : <Info size={14} />}
              </div>
              {toast.message}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
