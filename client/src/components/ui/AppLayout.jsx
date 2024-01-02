import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="bg-secondary mt-[55px] flex flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
