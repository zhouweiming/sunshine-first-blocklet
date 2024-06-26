import { useEffect, useState } from 'react';
import { Profile } from '../../data-types/user';
import { Button, message } from 'antd';
import { getProfile } from '../../libs/api';
import './view.css';

function ProfileView(config: { onEdit: () => void } = { onEdit: () => {} }) {
  const [profileInfo, setProfileInfo] = useState<Profile>({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    bindProfile();
  });

  const bindProfile = async () => {
    const result = await getProfile()
    if (result.code === 200) {  
      setProfileInfo(result.data);
    } else {
      message.error(result.message);
    }
  };

  const redirectProfileModifyPage = () => {
    config.onEdit();
  };

  return (
    <div className="view-wrapper">
      <div className="profile-viewer">
        <div className="row">
          <div className="label">用户名：</div>
          <div className="content">{profileInfo.name}</div>
        </div>
        <div className="row">
          <div className="label">邮箱：</div>
          <div className="content">{profileInfo.email || '未设置'}</div>
        </div>
        <div className="row">
          <div className="label">手机号：</div>
          <div className="content">{profileInfo.phone || '未设置'}</div>
        </div>
      </div>
      <div className="opt-wrapper">
        <Button type="primary" onClick={() => redirectProfileModifyPage()}>编辑</Button>
      </div>
    </div>
  );
}

export default ProfileView;
