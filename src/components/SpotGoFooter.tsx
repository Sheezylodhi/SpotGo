import {
  ArrowUpRight,
  Mail,
  MapPin,
  Navigation,
  ShieldCheck,
} from "lucide-react";

import { SpotGoLogo } from "./SpotGoNavbar";

export default function SpotGoFooter() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="[&_span]:!text-white">
              <SpotGoLogo />
            </div>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Find smarter parking, reserve your spot and get where you are
              going without the usual parking stress.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {[].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-white">
              Product
            </h3>

            <div className="mt-5 space-y-3">
              {["Find parking", "Live availability", "Reserve a spot", "EV parking", "For businesses"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-sm font-medium text-slate-400 transition hover:text-white"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-white">
              Company
            </h3>

            <div className="mt-5 space-y-3">
              {["About SpotGo", "How it works", "Careers", "Contact", "Partner with us"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-sm font-medium text-slate-400 transition hover:text-white"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-white">
              Stay in the loop
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Get product updates, new parking zones and smart-city features.
            </p>

            <div className="mt-5 flex overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-1">
              <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                <Mail size={15} className="shrink-0 text-slate-500" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-slate-600"
                />
              </div>

              <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-950 transition hover:bg-cyan-400">
                <ArrowUpRight size={17} />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <ShieldCheck size={14} className="text-cyan-400" />
              Your data stays protected
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-white/10" />

        <div className="flex flex-col gap-5 text-xs font-medium text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 SpotGo. Smart parking for smarter cities.</p>

          <div className="flex flex-wrap items-center gap-5">
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms
            </a>
            <a href="#" className="transition hover:text-white">
              Cookies
            </a>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
          <MapPin size={11} />
          Karachi, Pakistan
          <span>•</span>
          Smart parking network
        </div>
      </div>
    </footer>
  );
}