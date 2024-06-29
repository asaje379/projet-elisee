import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { LabelInput } from '../components/label-input';

type UserForm = {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
};

type User = UserForm & {
  id: string;
};

const blankUser: UserForm = {
  lastname: '',
  firstname: '',
  email: '',
  password: '',
};

const backendUrl = 'http://localhost:3000/users';

export function Register() {
  const [userForm, setUserForm] = useState<UserForm>(blankUser);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const response = await fetch(backendUrl);
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userForm),
    });
    if (response.ok) {
      await response.json();
      setUserForm(blankUser);
      await loadUsers();
    } else {
      console.log('Une erreur est survenue');
    }
  }

  return (
    <div className="px-8">
      <h1 className="text-3xl">Créer son compte</h1>

      <form onSubmit={handleSubmit}>
        <LabelInput
          label="Nom"
          name="lastname"
          value={userForm.lastname}
          onChange={handleChange}
        />
        <LabelInput
          label="Prénom"
          name="firstname"
          value={userForm.firstname}
          onChange={handleChange}
        />
        <LabelInput
          label="Email"
          type="email"
          name="email"
          value={userForm.email}
          onChange={handleChange}
        />
        <LabelInput
          label="Mot de passe"
          type="password"
          name="password"
          value={userForm.password}
          onChange={handleChange}
        />
        <button className="px-4 py-2 border border-green-700 rounded bg-green-700 text-white">
          Continuer
        </button>
      </form>

      <h1 className="text-3xl py-6">Liste des utilisateurs</h1>

      <div>
        {users.map((user) => (
          <div key={user.id}>
            <div className="text-slate-500 text-xs">
              {user.firstname} {user.lastname}
            </div>
            <div className="text-slate-400">{user.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
