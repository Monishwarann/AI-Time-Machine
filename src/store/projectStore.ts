import { DEMO_PROJECTS } from '../data/demoProjects';
import { TimeMachineProject, WhatIfBranch, TimelineEvent } from '../types/timeMachine';

class ProjectStore {
  private projects: TimeMachineProject[] = [];
  private activeProjectId: string = '';
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('ai_time_machine_projects');
      if (stored) {
        this.projects = JSON.parse(stored);
      } else {
        this.projects = DEMO_PROJECTS;
        this.saveToStorage();
      }
    } catch (err) {
      this.projects = DEMO_PROJECTS;
    }
    if (this.projects.length > 0 && !this.activeProjectId) {
      this.activeProjectId = this.projects[0].id;
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('ai_time_machine_projects', JSON.stringify(this.projects));
    } catch (err) {
      console.warn('LocalStorage save failed', err);
    }
  }

  public getProjects(): TimeMachineProject[] {
    return this.projects;
  }

  public getActiveProject(): TimeMachineProject | undefined {
    return this.projects.find(p => p.id === this.activeProjectId) || this.projects[0];
  }

  public setActiveProjectId(id: string) {
    this.activeProjectId = id;
    this.notify();
  }

  public addProject(project: TimeMachineProject) {
    this.projects.unshift(project);
    this.activeProjectId = project.id;
    this.saveToStorage();
    this.notify();
  }

  public deleteProject(id: string) {
    this.projects = this.projects.filter(p => p.id !== id);
    if (this.activeProjectId === id) {
      this.activeProjectId = this.projects[0]?.id || '';
    }
    this.saveToStorage();
    this.notify();
  }

  public addWhatIfBranch(projectId: string, branchName: string, baseVersion: string, prompt: string) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;

    const newBranch: WhatIfBranch = {
      id: `branch-${Date.now()}`,
      branchName,
      baseVersion,
      scenarioPrompt: prompt,
      createdAt: new Date().toISOString().substring(0, 10),
      hypotheticalTimeline: [
        {
          id: `hyp-evt-1`,
          date: baseVersion,
          title: `Hypothetical Decision: ${branchName}`,
          description: `Hypothetical divergence point based on: "${prompt}". Architecture retained in custom configuration.`,
          type: 'architecture',
          confidence: 'speculative',
          status: 'hypothetical',
          isHypothetical: true,
          evidence: [
            {
              id: `ev-hyp-1`,
              sourceType: 'metadata',
              sourceReference: 'AI Alternative Evolution Simulation',
              contentSnippet: 'HYPOTHETICAL — NOT HISTORICAL FACT',
              confidence: 'speculative'
            }
          ]
        },
        {
          id: `hyp-evt-2`,
          date: String(parseInt(baseVersion) + 1 || 2024),
          title: 'Performance & Refactoring Pressure',
          description: 'Hypothetical bottleneck downstream due to un-decoupled monolith data structures.',
          type: 'refactoring',
          confidence: 'speculative',
          status: 'hypothetical',
          isHypothetical: true,
          evidence: []
        }
      ]
    };

    project.whatIfBranches.push(newBranch);
    this.saveToStorage();
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const projectStore = new ProjectStore();
