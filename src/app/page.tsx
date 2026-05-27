import { Navbar }          from '@/components/layout/Navbar'
import { Hero }            from '@/components/sections/Hero'
import { Identity }        from '@/components/sections/Identity'
import { ForwardDeployed } from '@/components/sections/ForwardDeployed'
import { FullStack }       from '@/components/sections/FullStack'
import { Projects }        from '@/components/sections/Projects'
import { Teaching }  from '@/components/sections/Teaching'
import { Content }   from '@/components/sections/Content'
import { Timeline }  from '@/components/sections/Timeline'
import { TrustNetwork } from '@/components/sections/TrustNetwork'
import { Metrics }      from '@/components/sections/Metrics'
import { Contact }   from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Identity />
      <ForwardDeployed />
      <FullStack />
      <Teaching />
      <Content />
      <Projects />
      <Metrics />
      <TrustNetwork />
      <Timeline />
      <Contact />
    </main>
  )
}

    // <main>
    //   <Navbar />
    //   <Hero />
    //   <Identity />
    //   <ForwardDeployed />
    //   <FullStack />
    //   <Projects />
    //   <Teaching />
    //   <Content />
    //   <Timeline />
    //   <TrustNetwork />
    //   <Metrics />
    //   <Contact />
    // </main>