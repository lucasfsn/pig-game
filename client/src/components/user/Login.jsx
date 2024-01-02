import Modal from '../ui/Modal.jsx';
import LoginForm from './LoginForm.jsx';
import SignUpForm from './SignUpForm.jsx';

function Login() {
  return (
    <div className="w-full h-screen bg-gray-950 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center shadow-2xl bg-slate-500 rounded-lg p-4 text-gray-950 w-[350px] gap-4">
        <LoginForm />
        <Modal>
          <Modal.Open opens="signup">
            <button className="font-semibold px-6 py-1.5 w-fit mx-auto rounded-full text-2xl hover:bg-gray-700 transition-all bg-gray-950 text-gray-200">
              Create account
            </button>
          </Modal.Open>
          <Modal.Window name="signup">
            <SignUpForm />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default Login;
