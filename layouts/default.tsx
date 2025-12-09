import { Link } from '@heroui/link';
import { Head } from './head';
import { Navbar } from '@/components/navbar';
import { SideBar } from '@/widgets/nav-bar/nav-bar.ui';
import { Card } from '@heroui/card';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen container mx-auto">
      <Head />
      <Navbar />

      <main className="flex-1 flex  ">
        <div className="w-[15%]  ">
          <SideBar />
        </div>

        <div className="w-[70%] min-w-[70%] max-w-[70%]   px-10">
          <div className="max-w-full px-10">{children}</div>
          </div>

        <div className="w-[15%]  p-6">
          <div className="fixed">
            <Card className="w-[200px] h-[500px] shadow-none border border-default-200">
              <h2></h2>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
