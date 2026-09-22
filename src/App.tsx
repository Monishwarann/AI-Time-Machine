import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/landing/Hero';
import { ProjectList } from './components/dashboard/ProjectList';
import { ProjectExplorer } from './components/explorer/ProjectExplorer';
import { Dropzone } from './components/upload/Dropzone';
import { AuthModal } from './components/auth/AuthModal';
import { projectStore } from './store/projectStore';
import { TimeMachineProject } from './types/timeMachine';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'project'>('landing');
  const [activeProject, setActiveProject] = useState<TimeMachineProject | undefined>(projectStore.getActiveProject());
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    return projectStore.subscribe(() => {
      setActiveProject(projectStore.getActiveProject());
    });
  }, []);

  const handleSelectDemo = (demoId: string) => {
    projectStore.setActiveProjectId(demoId);
    setCurrentView('project');
  };

  const handleSelectProjectFromDashboard = (projectId: string) => {
    projectStore.setActiveProjectId(projectId);
    setCurrentView('project');
  };

  const handleUploadComplete = (projectId: string) => {
    projectStore.setActiveProjectId(projectId);
    setIsUploadOpen(false);
    setCurrentView('project');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 selection:bg-cyan-500 selection:text-slate-900 font-sans">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={(view) => setCurrentView(view as any)}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <Hero
            onOpenUpload={() => setIsUploadOpen(true)}
            onSelectDemo={handleSelectDemo}
            onExploreFeatures={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'dashboard' && (
          <ProjectList
            onSelectProject={handleSelectProjectFromDashboard}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )}

        {currentView === 'project' && activeProject && (
          <ProjectExplorer
            project={activeProject}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}
      </main>

      {/* Upload Modal */}
      {isUploadOpen && (
        <Dropzone
          onComplete={handleUploadComplete}
          onCancel={() => setIsUploadOpen(false)}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal />

      {/* Footer */}
      <Footer activeProject={activeProject} />
    </div>
  );
};

export default App;
