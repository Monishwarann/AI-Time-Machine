import { ComponentEvolution } from '../../types/timeMachine';

export function trackComponentEvolution(): ComponentEvolution[] {
  return [
    {
      id: 'comp-1',
      componentName: 'process_data()',
      type: 'function',
      firstObserved: '2019',
      history: [
        { yearLabel: '2019', snippet: 'def process_data(data):\n  return np.array(data) * 2', changeNote: 'Initial basic NumPy array calculation' },
        { yearLabel: '2021', snippet: 'def process_data(data):\n  # Validate input data\n  if not data: raise ValueError()\n  return db.save_metrics(np.array(data))', changeNote: 'Added input validation and SQLite persistence' },
        { yearLabel: '2024', snippet: 'async def process_data(req: DataRequest):\n  async with async_session() as session:\n    return await session.execute(query)', changeNote: 'Migrated to async/await and PostgreSQL driver' }
      ]
    },
    {
      id: 'comp-2',
      componentName: 'AuthService',
      type: 'class',
      firstObserved: '2022',
      history: [
        { yearLabel: '2022', snippet: 'class AuthService:\n  def create_jwt(self, user):\n    return jwt.encode(user, SECRET)', changeNote: 'Initial JWT Bearer token generator' },
        { yearLabel: '2025', snippet: 'class AuthService:\n  async font_token(self, token):\n    # Supabase & OAuth2 support\n    return verify_supabase_session(token)', changeNote: 'OAuth2 and multi-provider session validation' }
      ]
    }
  ];
}
