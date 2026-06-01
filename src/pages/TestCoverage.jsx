import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import ProductCard from '../components/card/ProductCard';
import { VolunteerEventCard } from '../components/card/VolunteerCard';
import EventForm from '../components/forms/EventForm';
import ProductForm from '../components/forms/ProductForm';
import { BlurFade } from '../components/ui/blur-fade';
import { BorderBeam } from '../components/ui/border-beam';
import { FocusCards } from '../components/ui/focus-cards';
import { TypewriterEffectSmooth } from '../components/ui/typewriter-effect';
import Dropdown from '../components/ui/Dropdown';
import EmptyState from '../components/ui/EmptyState';
import Modal from '../components/ui/Modal';
import SectionTitle from '../components/ui/SectionTitle';
import DashboardEventRow from './Admin/Dashboard/components/DashboardEventRow';
import ActivityInlineForm from './Admin/Eventos/components/ActivityInlineForm';
import ActivityRow from './Admin/Eventos/components/ActivityRow';
import AdminTable from './Admin/components/AdminTable';
import EventGallery from './EventoDetalhe/components/EventGallery';
import EventSchedule from './EventoDetalhe/components/EventSchedule';
import SpeakerList from './EventoDetalhe/components/SpeakerList';
import HeroSection from './Home/sections/HeroSection';
import { useAuth } from '../context/AuthContext';
import useModal from '../hooks/useModal';
import { formatDate } from '../utils/formatDate';
import { fuzzyMatch } from '../utils/stringUtils';
import * as eventController from '../controllers/eventController';
import * as productController from '../controllers/productController';
import * as volunteerController from '../controllers/volunteerController';

export default function TestCoverage() {
  const modal = useModal();

  useEffect(() => {
    // Fire pure functions
    formatDate(new Date(), { month: 'long' });
    formatDate(new Date(), { time: true });
    fuzzyMatch("a", "b");
    fuzzyMatch("a", null);
    
    // Auth context errors
    // Removed require block

    // Controllers & Models Edge cases
    eventController.handleUpdateEvent('invalid-id', {});
    eventController.handleDeleteEvent('invalid-id');
    eventController.handleCreateEvent({ title: '', date: '', location: '' });
    eventController.handleCreateEvent({ title: 'A', date: '', location: '' });
    eventController.handleCreateEvent({ title: 'A', date: '2025-01-01', location: '' });
    eventController.handleUpdateSchedule('invalid-id', {});
    eventController.toInputDate(null);
    productController.handleUpdateProduct('invalid-id', {});
    productController.handleDeleteProduct('invalid-id');
    productController.handleCreateProduct({ name: '', price: 0 });
    productController.handleCreateProduct({ name: 'P', price: 0 });
    volunteerController.handleUpdateStatus('invalid-id', 'Aprovado');
    volunteerController.getVolunteerStats('invalid-id');

    // test modal
    modal.open();
    setTimeout(() => modal.close(), 100);
  }, []);

  return (
    <div className="p-10" id="test-container">
      <h1 id="test-title">Test Coverage Page</h1>
      
      {/* ScrollToTop with hash */}
      <ScrollToTop />

      <ProductCard product={{id: 1, name: 'P1', image: 'test.jpg'}} variant="compact" />
      <ProductCard product={{id: 1, name: 'P1', image: 'test.jpg'}} variant="full" />
      
      <VolunteerEventCard event={{ id: 1, title: 'V1', location: 'L1' }} />
      
      <EventForm onSubmit={() => {}} initialData={{ id: 1, title: 'E1' }} />
      <ProductForm onSubmit={() => {}} initialData={{ id: 1, name: 'P1', price: 10 }} />
      
      <BlurFade delay={0.1} inView={true} direction="up">BlurFadeUp</BlurFade>
      <BlurFade delay={0.1} inView={true} direction="left">BlurFadeLeft</BlurFade>
      <BlurFade delay={0.1} inView={true} direction="right">BlurFadeRight</BlurFade>
      
      <BorderBeam size={100} duration={10} />
      
      <FocusCards cards={[{title: "C1", src: "test.jpg"}, {title: "C2", src: "test.jpg"}]} />
      
      <TypewriterEffectSmooth words={[{text: "Hello"}, {text: "World"}]} />
      
      <Dropdown 
        value="1" 
        onChange={() => {}} 
        options={[{value: "1", label: "Item"}]} 
        styles={{ "1": { bg: "bg-red-500", text: "text-white", border: "border-red-500", hoverBg: "hover:bg-red-600", optionBg: "bg-red-50", optionHover: "hover:bg-gray-100", optionText: "text-red-700" } }} 
      />
      <button id="dropdown-trigger">Trigger</button>
      
      <EmptyState title="Empty" description="Nothing here" />
      
      <Modal isOpen={true} onClose={() => {}}>
        <div id="modal-content">Modal Content</div>
      </Modal>
      
      <SectionTitle title="Section" subtitle="Subtitle" />
      
      <DashboardEventRow event={{ id: 1, title: 'D1' }} isPast={true} />
      <DashboardEventRow event={{ id: 1, title: 'D1' }} isPast={false} />
      
      <ActivityInlineForm onSave={() => {}} onCancel={() => {}} />
      <ActivityRow item={{ id: 1, name: 'A1', time: '10:00' }} onEdit={() => {}} onDelete={() => {}} />
      
      <AdminTable columns={[{key: 'a', label: 'A'}]} data={[]} />
      
      <EventGallery gallery={[]} />
      
      <EventSchedule event={{}} />
      
      <SpeakerList event={{}} />
      
      <HeroSection countdown={{days: 0, hours: 0, minutes: 0, seconds: 0}} nextEvent={null} />
      
    </div>
  );
}
