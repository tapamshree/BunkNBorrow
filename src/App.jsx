import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Communities from './pages/Communities';
import { ItemDetailModal, ListingCreateModal, ChatModal } from './components/Modals';

export default function App() {
  const [page, setPage] = useState('home');
  const [modal, setModal] = useState(null); // { type, data }

  const navigate = (target) => {
    if (target === 'create') {
      setModal({ type: 'create' });
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
        {page === 'marketplace' && <Marketplace onItemClick={openItem} onChat={openChat} />}
        {page === 'communities' && <Communities />}
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
    </>
  );
}
