import { Layout } from "~/components/layouts/layout";
import { Announcement } from "~/components/sections/announcement";
import { Footer } from "~/components/sections/footer";
import { Hero } from "~/components/sections/hero";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

const Home = async () => {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      {/* <main>
        <div>
          <h1>
            Create <span>T3</span> App
          </h1>
          <div>
            <p>{hello ? hello.greeting : "Loading tRPC query..."}</p>

            <div>
              <p>{session && <span>Logged in as {session.user?.name}</span>}</p>
              <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>

          {session?.user && <LatestPost />}
        </div>
      </main> */}
      <Announcement />
      <Layout>
        <Hero />
        <div className="container xl:mt-36 xl:scale-110">
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 0,
              paddingTop: "56.2500%",
              paddingBottom: 0,
              boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
              marginTop: "1.6em",
              marginBottom: "0.9em",
              overflow: "hidden",
              borderRadius: 8,
              willChange: "transform",
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                border: "none",
                padding: 0,
                margin: 0,
              }}
              src="https://www.canva.com/design/DAGuLUC6Dmk/vv8O0ZGOXO7aECGrOuxPzA/view?embed"
              allowFullScreen={true}
              allow="fullscreen"
            ></iframe>
          </div>
          <a
            href="https://www.canva.com/design/DAGuLUC6Dmk/vv8O0ZGOXO7aECGrOuxPzA/view?utm_content=DAGuLUC6Dmk&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
            target="_blank"
            rel="noopener"
          ></a>
        </div>
      </Layout>
    </HydrateClient>
  );
};

export default Home;
