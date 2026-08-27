import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import TrollNotifications from './components/TrollNotifications';
import NavbarGlass from './components/NavbarGlass';
import CountdownHero from './components/CountdownHero';
import Lobby3D from './components/Lobby3D';
import HonestBondIntro from './components/HonestBondIntro';
import VyshuuProfile from './components/VyshuuProfile';
import VyshuuVsFood from './components/VyshuuVsFood';
import PhotoStories3D from './components/PhotoStories3D';
import ChatUniverse3D from './components/ChatUniverse3D';
import InternetSiblingCourt from './components/InternetSiblingCourt';
import ArcadeLobby from './components/arcade/ArcadeLobby';
import RakhiMaterialsRoom from './components/RakhiMaterialsRoom';
import RakhiStudio from './components/RakhiStudio';
import DecorateThali from './components/DecorateThali';
import EmotionalTransition from './components/EmotionalTransition';
import AppreciationSculpture3D from './components/AppreciationSculpture3D';
import RakhiCeremony3D from './components/RakhiCeremony3D';
import SiblingContract3D from './components/SiblingContract3D';
import VoiceNoteChamber from './components/VoiceNoteChamber';
import FinalGiftVault from './components/FinalGiftVault';
import Letter3D from './components/Letter3D';
import ConstellationFinale from './components/ConstellationFinale';
import SecretEnding from './components/SecretEnding';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeSection, setActiveSection] = useState('story');
  const [cursorMode, setCursorMode] = useState('default');
  const [customRakhi, setCustomRakhi] = useState({
    threadHex: '#dc2626',
    base: 'floral',
    center: 'v_monogram',
    hasPearls: true,
    hasKundans: true,
    latkan: 'bells'
  });

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Desktop Custom Pointer Cursor */}
      <CustomCursor cursorMode={cursorMode} />

      {/* Floating System Troll Toast Notifications */}
      {hasEntered && <TrollNotifications />}

      {/* Real-time Countdown Gate to 28 August 12:00 AM IST */}
      {!hasEntered && (
        <CountdownHero 
          onUnlockComplete={() => setHasEntered(true)} 
          isLockedByDefault={true}
        />
      )}

      {/* Navigation: Top glass pill on desktop, Bottom nav bar on mobile */}
      {hasEntered && (
        <NavbarGlass 
          activeSection={activeSection} 
          onNavigate={scrollToSection} 
        />
      )}

      {/* Main Experience Universe */}
      {hasEntered && (
        <main>
          {/* 3D Portal Lobby Hub */}
          <div id="lobby">
            <Lobby3D onSelectPortal={scrollToSection} />
          </div>

          {/* Section: Story - Honest Cinematic Intro & Vyshuu Facts */}
          <div id="story">
            <HonestBondIntro />
            <VyshuuProfile />
          </div>

          {/* Section: Our World - 3D Chat Universe & Authentic Photos */}
          <div id="world">
            <div 
              onMouseEnter={() => setCursorMode('view')} 
              onMouseLeave={() => setCursorMode('default')}
            >
              <PhotoStories3D />
            </div>
            <ChatUniverse3D />
          </div>

          {/* Section: Fun - Vyshuu vs Food & Internet Court */}
          <div id="food">
            <VyshuuVsFood />
            <InternetSiblingCourt />
          </div>

          {/* Section: Arcade - Online Chaos Arcade */}
          <div id="arcade">
            <ArcadeLobby 
              customRakhi={customRakhi} 
              onSaveRakhi={setCustomRakhi} 
            />
          </div>

          {/* Section: Rakhi Studio Workshop */}
          <div id="studio">
            <RakhiMaterialsRoom onOpenStudio={() => scrollToSection('studio')} />
            <RakhiStudio 
              customRakhi={customRakhi} 
              onSaveRakhi={setCustomRakhi}
              onProceedToCeremony={() => scrollToSection('rakhi')}
            />
            <DecorateThali />
          </div>

          {/* Calm Emotional Transition */}
          <EmotionalTransition />

          {/* 3D Virtue Word Cloud Sculpture */}
          <AppreciationSculpture3D />

          {/* Section: Rakhi - 3D Sacred Ceremony & Sibling Contract */}
          <div 
            id="rakhi"
            onMouseEnter={() => setCursorMode('thread')}
            onMouseLeave={() => setCursorMode('default')}
          >
            <RakhiCeremony3D customRakhi={customRakhi} />
            <SiblingContract3D />
          </div>

          {/* 3D Voice Note Chamber & Final Gift Vault */}
          <VoiceNoteChamber />
          <FinalGiftVault />

          {/* Section: Letter - Ashu's Handwritten Parchment */}
          <div 
            id="letter"
            onMouseEnter={() => setCursorMode('heart')}
            onMouseLeave={() => setCursorMode('default')}
          >
            <Letter3D />
          </div>

          {/* Grand Finale: 3D Constellation & Photo #3 Reveal with Ashu's Signature */}
          <div id="finale">
            <ConstellationFinale />
          </div>

          {/* Secret Ending Easter Egg & Footer */}
          <SecretEnding />
        </main>
      )}
    </div>
  );
}
