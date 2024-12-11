import { useState } from 'react';

function ChangePassModal({ onSuccess }: { onSuccess: () => void }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword_, setNewPassword_] = useState('');

  const handleSubmit = async () => {
    try {
        if(newPassword !== newPassword_)
        {
            alert("new password doesnt match");
            return;
        }
        const response = await fetch("http://localhost:8080/api/user/change_password",
        {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem("jwtToken")}`
            },
            body: JSON.stringify({
              currentPassword: oldPassword,
              newPassword: newPassword,
            }),
        });

        const data = await response.json();
        alert(data.message);
        onSuccess();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="p-4">
      <input
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="password lama"
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="password baru"
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        value={newPassword_}
        onChange={(e) => setNewPassword_(e.target.value)}
        placeholder="konfirmasi password baru"
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSubmit}
        className="w-full p-2 bg-orange text-white rounded hover:bg-light_orange"
      >
        Ubah Password
      </button>
    </div>
  );
}

export default ChangePassModal;
