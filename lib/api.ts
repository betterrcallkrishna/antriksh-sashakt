const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://antriksh-sashakt-8.onrender.com';

export interface Procedure {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  stepsCompleted: number;
  totalSteps: number;
  startTime: string;
  expectedDuration: number;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'step' | 'alert' | 'event';
  message: string;
  severity: 'info' | 'warning' | 'error';
}

export interface Stats {
  activeProcedures: number;
  stepsDetected: number;
  systemUptime: number;
  alertsToday: number;
}

export interface TelemetryData {
  timestamp: string;
  fpsCamera: number;
  latencyMs: number;
  cpuUsage: number;
  memoryUsage: number;
}

class AntrikshAPI {
  async getHealth() {
    try {
      const response = await fetch(`${API_BASE}/health`, {
        cache: 'no-store',
      });
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  async getProcedures(): Promise<Procedure[]> {
    try {
      const response = await fetch(`${API_BASE}/api/procedures`, {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Failed to fetch procedures');
      return await response.json();
    } catch (error) {
      console.error('Error fetching procedures:', error);
      return [];
    }
  }

  async getProcedureById(id: string): Promise<Procedure | null> {
    try {
      const response = await fetch(`${API_BASE}/api/procedures/${id}`, {
        cache: 'no-store',
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error(`Error fetching procedure ${id}:`, error);
      return null;
    }
  }

  async getStats(): Promise<Stats> {
    try {
      const response = await fetch(`${API_BASE}/api/stats`, {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Failed to fetch stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {
        activeProcedures: 0,
        stepsDetected: 0,
        systemUptime: 0,
        alertsToday: 0,
      };
    }
  }

  async getActivityLog(): Promise<ActivityLog[]> {
    try {
      const response = await fetch(`${API_BASE}/api/activity-log`, {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Failed to fetch activity log');
      return await response.json();
    } catch (error) {
      console.error('Error fetching activity log:', error);
      return [];
    }
  }

  async getTelemetry(): Promise<TelemetryData[]> {
    try {
      const response = await fetch(`${API_BASE}/api/telemetry`, {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Failed to fetch telemetry');
      return await response.json();
    } catch (error) {
      console.error('Error fetching telemetry:', error);
      return [];
    }
  }
}

export const api = new AntrikshAPI();
