import { Link } from '@heroui/link';
import { Head } from './head';
import { Navbar } from '@/components/navbar';
import { SideBar } from '@/widgets/nav-bar/nav-bar.ui';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen container mx-auto">
      <Head />
      <Navbar />

      <main className="flex-1 flex justify-between ">
        <div className="w-[15%]  ">
          <SideBar />
        </div>

        <div className="w-[70%] max-w-[70%]  flex px-10">
          <div className="max-w-full px-10">{children}</div>
          
          </div>

        <div className="w-[15%] bg-gray-50  p-6">
          {/* <div className="fixed">
            <h3 className="font-bold text-lg mb-4">Реклама</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border text-sm">
                Рекламный блок 1
              </div>
              <div className="bg-white p-3 rounded border text-sm">
                Рекламный блок 2
              </div>
              <div className="bg-white p-3 rounded border text-sm">
                Рекламный блок 3
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}
