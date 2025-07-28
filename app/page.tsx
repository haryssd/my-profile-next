import ProfileCard from "@/components/ProfileCard";
import Tagline from "@/components/Tagline";
import SignatureCard from "@/components/SignatureCard";
import StatsCard from "@/components/StatsCard";
import WorkExperience from "@/components/WorkExperience";
import Certificates from "@/components/Certificates";
import Projects from "@/components/Projects";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="grid grid-cols-3 gap-6 ">
        {/* Row 1 */}
        <div className="row-span-2">
          <ProfileCard />
        </div>
        <div className="col-span-2">
          <Tagline />
        </div>

        {/* Row 2 */}
        <div>
          <SignatureCard />
        </div>
        <div>
          <MusicPlayer />
        </div>

        {/* Row 3 */}
        <div className="col-span-1">
          <WorkExperience />
        </div>
        <div>
          <Projects />
        </div>
        <div>
          <Certificates />
        </div>

        {/* Row 4 */}
        <div className="col-span-2">
          <StatsCard />
        </div>
      </div>
    </div>
  );
}
