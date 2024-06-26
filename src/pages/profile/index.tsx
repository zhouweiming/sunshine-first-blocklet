import { useState } from 'react';
import ProfileModify from './modify';
import ProfileView from './view';
import './index.css';

function ProfileComponent() {
  const [mode, setMode] = useState<'edit' | 'view'>('view')

  return (
    <div className="wrapper">
      { mode === 'edit' ? <ProfileModify onView={() => setMode('view')} /> : <ProfileView onEdit={() => setMode('edit')} /> }
    </div>
  );
}

export default ProfileComponent;
