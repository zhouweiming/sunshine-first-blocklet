import { useEffect, useState } from 'react';
import { Profile } from '../../data-types/user';
import { Button, Form, Input, message } from 'antd';
import { getProfile, modifyProfile } from '../../libs/api';
import './modify.css';

function ProfileModify(config: { onView: () => void } = { onView: () => {} }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const [form] = Form.useForm();
  const [, setProfileInfo] = useState<Profile>({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    initProfile();
  }, []);

  const initProfile = async () => {
    const result = await getProfile()
    if (result.code === 200) {  
      setProfileInfo(result.data);
      form.setFieldsValue(result.data);
    } else {
      message.error(result.message);
    }
  };

  const saveProfile = async () => {
    let tempProfile;

    try {
      tempProfile = await form.validateFields();
    } catch (ex) {
      message.warning('有错误，请修改后重新提交！');
      return;
    }

    const callbackResult = await modifyProfile(tempProfile);
    if (callbackResult.code === 200) {  
      await initProfile();
      message.success('提交成功！')
    } else {
      message.error(callbackResult.message);
    }
  };

  return (
    <div className="profile-modify-wrapper">
      <div className="content-wrapper">
        <Form
          {...layout}
          form={form}
          name="control-hooks"
        >
          <Form.Item name="name" label="用户名" rules={[{ required: true, type: 'string', message: '请输入6-12位英文字母', min: 6, max: 12, pattern: /^[a-zA-Z]{6,12}$/g }]}>
            <Input placeholder='请输入6-12位英文字母' />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email', message: '请输入有效的邮箱地址，最长30个字符', len: 30 }]}>
            <Input placeholder='请输入有效的邮箱地址，最长30个字符' />
          </Form.Item>
          <Form.Item name="phone" label="手机号" rules={[{ required: false, type: 'string', message: '请输入11位手机号', len: 11, pattern: /^1[0-9]{10}$/g }]}>
            <Input placeholder='请输入11位手机号' />
          </Form.Item>
        </Form>
      </div>
      <div className="opt-wrapper">
        <Button type="link" onClick={() => config.onView()}>返回</Button> 
        <Button type="primary" onClick={() => saveProfile()}>保存</Button>
      </div>
    </div>
  );
}

export default ProfileModify;
