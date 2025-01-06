import { login, signup, signInWithDiscord } from './actions';
import TestButton from '@/shared/ui/TestButton';

export default function LoginPage() {
  return (
    <>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          className="text-black"
          id="email"
          name="email"
          type="email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          className="text-black"
          id="password"
          name="password"
          type="password"
          required
        />
        <label htmlFor="username">username:</label>
        <input
          className="text-black"
          id="username"
          name="username"
          type="text"
          required
        />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
      <TestButton />
    </>
  );
}
