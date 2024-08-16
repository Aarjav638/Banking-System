import React from "react";
import Image from "next/image";

const About: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center ">
        <h1 className="text-4xl mt-8">About Us</h1>
        <div className="my-4 w-5/6 sm:w-3/4 bg-slate-200 p-4">
          <h2 className="text-2xl mb-2 text-center">Why Choose Us?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit
            dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
            Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et,
            consequat nibh. Etiam non elit dui. Nulla nec purus feugiat,
            molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec
            purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit
            dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
            Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et,
            consequat nibh. Etiam non elit dui.
          </p>
          <div className="w-full bg-slate-400 h-[0.1px] my-4" />
          <h2 className="text-2xl mb-2 text-center">Our Mission</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit
            dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
            Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et,
            consequat nibh. Etiam non elit dui. Nulla nec purus feugiat,
            molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec
            purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit
            dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
            Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et,
            consequat nibh. Etiam non elit dui. Nulla nec purus feugiat,
            molestie ipsum et, consequat nibh. Etiam non elit dui.
          </p>
          <div className="w-full bg-slate-400 h-[0.1px] my-4" />
          <h2 className="text-2xl mb-2 text-center">Our Vision</h2>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            doloremque aperiam veniam atque eligendi odit maxime magnam
            assumenda hic. Eum incidunt, tempore autem porro quaerat fuga saepe?
            Doloremque, perspiciatis cum! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Laborum doloremque aperiam veniam atque eligendi
            odit maxime magnam assumenda hic. Eum incidunt, tempore autem porro
            quaerat fuga saepe? Doloremque, perspiciatis cum! Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Laborum doloremque aperiam
            veniam atque eligendi odit maxime magnam assumenda hic. Eum
            incidunt, tempore autem porro quaerat fuga saepe? Doloremque,
            perspiciatis cum!
          </p>
          <section className="flex flex-col bg-blue-200 my-4 p-4 gap-y-4 rounded-md z-10 shadow-sm shadow-slate-400 ">
            <h2 className="text-xl text-center">Our Team</h2>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="bg-slate-100 p-4 w-5/6 sm:w-1/2 items-center justify-center flex flex-col">
                <div className="w-full  h-40 md:h-48 lg:h-60 bg-black">
                  <Image
                    height={200}
                    width={200}
                    src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                    alt="John Doe"
                    className="w-full h-full object-cover "
                  />
                </div>
                <h3 className="text-lg">John Doe</h3>
                <p>CEO</p>
              </div>
              <div className="bg-slate-100 p-4 w-5/6 sm:w-1/2 items-center justify-center flex flex-col ">
                <div className="w-full  h-40 md:h-48 lg:h-60 bg-black">
                  <Image
                    height={200}
                    width={200}
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA+gMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAABAAIDBQYEBwj/xAA6EAABBAECAwYDBgUDBQAAAAABAAIDEQQFIQYSMRMiQVFhcTKBoQcUI0KRwSQzUrHwFdHxFiZDU+H/xAAbAQEBAAMBAQEAAAAAAAAAAAAAAQIDBAUGB//EADERAQACAgAEBAQFBAMBAAAAAAABAgMRBBIhMQUiQVEGE2GxIzJxgcEUkaHwQtHhgv/aAAwDAQACEQMRAD8A17V6b59K1RTwoyFAbRRtAQdlAbQGwikCgeEUVAkCukGf4j4v0vQYpWyzsly2tJZjNO7j5HyWNrxVtpitftHR5nn/AGg67lS88eaMdp6RwBpA+ZC5bZrTPR6FOFxRHWNnYfH+uwvBfk9qPESMbv8ARYzmvDZHC4ZjWm+4a40bqBZFqEbYnO7oe07A+Tgenv0WeLieadWc+fgppHNRsgV1OE9RSQJA60UkBUCRRCAoEopIAqhIKFq3uSEgUU60UbU0FaaCtNBwKaCvdFFQOCKcCgcooorIfaBxSNCwjjYjwM6Zppx/8TfOvP8A3WrLk5Y06OHwfMnc9oeW6LpGVxLlOLGB0RNvnmslxXDkycvd7WHDFu0dG2w/svgAJbM4l29V3f0XPOa0un+nrDj1PgeTSX9pCXvir8RnhXnX+yfNknDHeFNE8YWV2RJMD9mOHWI/uP8APJZd+rX26PRuB+I3Zsh0jPcHZMTOaJ//ALY9vqLXfgy83ll5HGcPFPPXs2QXQ4hQJAUUggKAhQFFJAQoCigUQFRQtW9yHhF2VobG0NlaGyDkBDkDgVNECCppdnAoogqKeCgT3hkbnu6NBJRXz/xTlzaxreXJJfaSzNiaPIXdf2XnZLbmZe5gxxFKx7vU+GNMj07Gghx20GtAdt1K4bTudvXrWK1028DAxo23UhhPWU8+JHmYropW2COqy10auaay8W1/SxpWvSafmHmZydpA4j447Ni/Nvh6FWu9LaI30QaBNJFxZpcmODIYshvMGjflfbHfpzA/NdGDpeHFxUbx2e1Benp4cSSikgVoFaGzgUUQVAUUUCCByAIAgoAt7jOtArQC0C5kC5lQg5QPDkXYgop4Kmg4FRdnhRXDrmYzC02eR9fAdyaA9ypadQzpXmtEPBIpnZXE+I4D+ZlMcR8//i823WJl79NxNYj0elZ8+TDlCLFgz5nkAmSKTkY2/Aea5omNO60T7NVwtm5D8j7lkvmJbYuUd5a57sp6V25eKDms1IMgjzJjYHIyYsYQfHbqsq9PVJiJjcRtjvtD7YYej5k+JkYkrHSwuY93OKPLRDt+tHb3WVJiejXkjXVktDz3YmsCTnc2Qxua3fe9iCPW2rbO9dHP33E+r6Dw5xk4kU7SD2jA7b1Fr1KzuNvAtGrTCZXRsU0bJE2ShAoyFAbQEFQFFEIEgCDPgrocZWoFaoBKAEohtoCCmjZwcintcoJGlF2eCppkeCorIfad2n/Tb+xaSXSMjFeFnf8AUbfNas35JdPCdcsfv9nmei6eRxFyTSMZk4rmvLHmuhF/Nedk3V72Ca5N2iXt2kPgGGTk8pA/qC5JiHdCDSMyE666RxEex5WkbpHRbRM1X2TlMGRCZo/4Z47spG1+XorPdrpE6mInqoPtSxoc3hOdrQwdk9kkZdsAbA/tau/PGoa4rPLPM8dkbC98cD2iSRh2czdzfY+IW2NzLTfUPd9DgGNpGJFuahbd+y9asarp89ktu8y7lWJIEgSAhQ2NobK0UQinKBAoooEiM4CuhxlaBEoBaAWqhtpCbK1dJsgVF2kaVFiUzSoySNKjKEgRYQ5+FDqGHLizjuSCr8j4EexWMxExqWdLTS0TDyvjbg3MbB/rOMwzSBv8TD+bmafjb5+dLnyYp1uHfw3EV3yT+zX6PlxZ2lRyRyBkksTXMfVgGtwV5F66t1fRYrc1Il16RLqETy2cjmadnNju0dda45jq1LY8nKgP3qcuiI3jLRv7pPZy25Kz5IY/7U8yHE4Wj09jxG/MnjjZZ/K0hzj7UK+YWWCOrRxFp0ofs14dZnSO1LKDXw47yyEDo9wO5Xbgwza3NPaHmcZxEUryV7y9THpsPRdzySCAoBaAoEikmglAUUbRTggNqBIM5a6XGSBtokhaQgWqgEoFaIQKKe0qKlYVGUJ2qMkgUZHgqKbPjwZcD8fKhjmhkFOjkbbXD1Ck+yxMxMSpdWw8PBhxoMLFgx279yJgaK9gvP4ytY09zwq97c256JtK1MRdyVr3eRAtef2ezppIcl2TG3kiIHiXCk3v0aprqe7JcVcHf6/qUeTLklph7rQegGx2+a7uGwxeu/q8zjeKnFkiI9l1ommRaRp0eHCSQLt1AFxPiu6tYrXlh5OTJN7c0rAeizayUBtAECQG0BQJFFQJAQUURSKKDNLocJWgROyBtqoBQNtEIlAQUD2qLCZijNM0qKlaVFg8FRmhzMyHCx3TZLwxrRdeJ9lryZK46zazdw+DJxF4pjjuxePnS5+uST5DiGTMHYs/paOo/deHbiZzWmX2McBXhKVrT2/y0+mw8uTR6DxWKT2adkjYoTJI4NY0bk+SziXPMbnoosDVG5epTgBwjlH4V+m316rZwHExOW1P7Nfi/AWjhq5vbv8ApP8Av+VmvZfMFaBWgVobEFAVFK0BtAUCtAkBUUkCtBnF0uIkAQNJRAtA0lVAtAQUEjVGUJmlYshnyocWIy5ErImX1csL3rjjd51Ddhw5M94pijcz6Qo8zi6JjyzCxzMR+aR3ID7Dr/Zedl8UxU6V6voOG+HOIvG8s8v09VdkcR63MQIWwwA7DlZZ+pXFfxaZ7aeri+GsUfm3P7/+KGV2dNmyuzsh8xDKtx8b8Fx5OInLG5l63D8FTh51SIiPouMKKR+HjzQ/z4HEt9R4hacdtXbuIpzY2wZM2KOGZ5DS5gdS64no8ma7lw6rqM2oyNxWO5cVvelr83k1ac2bljUd3Rw3Dbnmns5smcYkJmDuV9hreU9CVyUtNZ3HR6HJGTyWjp9U+FxRJHyMyWmYHxaKcB89ivX4fxS0dMkb+sPC434cx33fBPLPtPb/ALXuNq+DlbMyGtd/TIOU/Vepj4vDk/LaHzmfwvjMP5qTMe8dfs7bB6LpeeSIAKKeCikCoHBArQK0CtAQgNqBIrNWupwFaKaSgBciGFyJIFyGy5kNnNKCVpRlCVpWLKGQ4o1B2RqYxG/y8f4h/U49V4HinEbtyR6d32/w7wfy8cZp72+zk0iFofLC7d0T6N+u4K8XJuer63HqIlamNrWF9bAbLUy2zeVLk8zuwDed5ppIuvkt+Oa+rRki09juGtdfp8oZqTnj8SxI4dPQjyW/JSs25qOasW5JpdpNbzH572RYRAZGNng2PkpfNqOndhw/CeeefszcWLrGPqckuPlFrdu0B3aTXkVh86k11MdXXOGZt0no0rmnMhiGQBbXc1N2BK59tnLyykfHCzlAaP0UWszKrnmc2IWOoJqrs/lFLKs9Vle6Pn5WnwRMyNwaDmDo2/Jehw3iF8U8s9YeH4h4Ph4yOavS/u1jHtexr2EFrhzA+6+kpat6xavaXweXHbHeaXjUxP2G1k1iCoogoogoHAoEgNqKSAoFaDMcy6XDsOZENLkTZhcqbDmRAtAgUU9pQSsKiwkdI1jC95prRZPkFhMxETM9mysTa0VjvLB4z/vOfLkPbRleX17+C+P4u/NM295fqvh+KMVK09oiP7f9urTWlmr5TSD342vH1C55n8OHd1iVlOahLfNamcQ4MbHBzWnwaLWSa6pcvTIMgPDmDvD9CkWtEpatZjqhwYPukcDAXOdRpz6NA70PmsrW5oY1rMT9FiGdnEb6ncla2yO6WM90FGMocyQtaXHYKrWNQ4dNlZPNJlyC4oTyRjzcspjUNUzzz0WBYHtBkkPddzurpaxZ9p6Q12muvCYD1H+fuvqfDb82DU+j888dxRTjJtH/AC6/xP2h1LveOQKEHWopAoQcChsrQEFFOtAlFFEZW10uACUDSVUMJVAJRAtAQUVICoqRpUHBxJO6DQ8ssNOc3kB9yuXjZ5cFnq+C44vx2OJ7RO2PxpnQvilI/DLuU+i+Syxu0w/S8U8tYla4jv8AuGYB1g4zCPTda9fh7+suiZ8+ne69w5am2OyHFrtnH5Ko7h8SjBxzjlY0nowDf5hWFGWcSSFrDYFBRauxnwgIxlw644xafK4dSFlTuxmfLLlwWdlp+Ewim8pea/MSsrzuZlaQsWATTNiA/DZ3nV9AsILTyw1OkSczZWnwr9173g9t1vD4v4lpETjt+v8ACwte0+XJAUUkBtAbRRBUNjaGxtFK0GWJXS4DSUYmEoBaqgiBaAhA8FRUjSgqOLiTo5aPzSNXneJ21gj9X0Hw3Xm4z/5n+Gdw4PvWNNj3ykt5h7hfLXtq3M/RMceWYR6Nludq2O+Q0XwGF/oWnZbL1/DnXvtKzvJE/rH9mlfbQ4nyXI60GF3nOd4WrKO8NPX0UYTPVxaqA3DIaSHu7teW43Wde7DntO+iPEjaymjwO6wbI7LGMokuDWz20AhaLc4rKOhWvRw6pJLBPpmJA25HMO3hS2VrE1m0tfN5tQuMNogjokuJ3vxcfNamy0bX+hEjtOf4pP2/5XseD21ktHv/AA+W+Jabw1tHpP3W/RfQvixBQEKA2gSBWgIKKKAgqLsrQ2ypculwGEqpsCVdJsCU0bC00bK00CCmg4KKe1RXBxEztdPYy6JkFfoV5ni864b930fwvv8Ar/2n+FFgxGHLYeoPdNL5WZ2/RYjSq1fHdp2YXssMceYbeP8Awt+KfmV5WrJ+HbmaPSc1mbjDpzho+YXPas1tMN9Z3G4dzAGiqAWDKU29bKtav1XdlNHRzbVhl10GEy6c9Q0tIwOSgjXbe0UjYmO53AEqM4mZjStm5JNQdku3EcXIPS+q2c2qa+pXHq0zKfCk7W5CdzsB5BYaZT1XWnzFmXAwbjmIPpa7OCycnEVl5HiuD5vCZP0+zQH1X1r83iSCA3aGyUCQEdEU4IFaA2gVoMpa6XBs0lXQaSiEgCBICCgeEXZ7VFhV8SvLMGMtNESgrzPFoicGp930fwxMxxkz9P5cWORIWv6OK+StHLOn6VXzRsdfx/vGlTP5Le1vMB6hZYravDXljyTE+ij4dzGDCx5QDuylu4msxkmGrhLxfDW0Lx2c3lDzYA6rn06ndhZUeQByu6HdTTC3Zz6g8OLeQghz6QjsXbsjPIPi8VGSZuTXiqvLDj1DLZDGXyO2VrWbTqCZisbW+l6GZAHZVyufR+7wnoD/AFFdePBHq8zNx0/8Oke6wnwcaLM7TLkjh7gazHg3c4eFef6LO+KLW3LTi4i/Jy06z7y4HCXHd2TI3nJ5w0MPUG1yVi0W6d3faa3ru0+XXdqrNb9R1X2sdn5RfXNOvcQrpiKikikEDgoooEgRKAIMpa6tOArRDSgFohtoCEBBQPBRT2lDap4oP8HE3zf+y8nxefwY/V9P8Lxvib2+jhw2zfc42Mx3PsXzF1Afuvl51M936LSdQtMKJ/OyHKpkcndc6y7lStYm3dpz3mKb06G8IaWGk4jnRA9OR3d/Rdl68/d5mLPbF0js5J+Gc+Bw7OSCWM9Q4lppaJwy7a8dX1hBgcPaxp+W6QY7ZccnYMk3/Q0rbDM1ifVa8XjmZiZDVCMEB08EsRBPKJGFoJ9+i0cluzqrelo8s7c2NJG5hlc4eZKwmJbIVObr0UMrgA51eQW+nD2s13z1ol4clk4g1IPbGRj4h53lw25vC/br8guquD5Xf1ebm42M24r6PQdPcYGvexjuxcPhjPflPmtmurit1/U7UZp8fGkniihwpXNprfjmfv4+X1WGS3LXfaW7BjjJaInrH+Fdgsc3Njnkc98jnC3Oda48Fp+dWZ94ehxcR/TXpHbU/ZpR4r7X6vynt0OCgIRSUUQiiCopyBEoGkqoFlBk+ZdLgK0AJRAJQC0QgUUQgkageFDSp4jdC6CKFx74dzV5e68fxfLWKRT1fW/C3D5Jy3z68utfuhwMgNhDXOcTZG5sBfN27vvqT0WsQMha2Mcz3bAALCInfRLzWI83Ze6bp2VjNLcinMJsFm9L0KROurwc1qzO6pX5mG2VzXSi27b+fqtmoauunfjZGLJGGxyxl/o5XlYTJzw021wFHqD4rHTKJ11VeZoGlZTHB+FEA7r2Y5LPnssJxx3dFOKy07SqTwXpnI5kDZIy7qbBP1Wu2Lc723xx99amHVo/CmPpmM/HgmeY3u532B3j6rdqZcts2536uuXR8zGZNkadOXzkfA8DceQ8lLVvMdDHlxxMRkjoy0MMWS45Li98rzbnPe4kn1s/RcFrWmfM9+kUrEcnZZ48oY9nM3cHZSk6tEtWanPS0R6w0AcHAOabtfbUtFqxNZ2/KsuO2O80tGp2cCqwOtAbSVIFRYFFG0AKAIgIjIcy6XCdzIBaoBKJIWiCCiweEDwoJB/hRWVzu2ZlyDIJL+bYnxHgvkuLx5K5bc/++z9T8NzYMnDUnBqI+3v/AJT6dj5GTKI4GXRBJOwXJGObu7LxEYenq2Ol4b8V3aSDnfXUdAt9MVavNz8TfLPWVzFkPHgQFlMOfSLUNPwtWgMeVBG+/Et3CdfRekMdlcHanp8xm0LOJYDZx5yXt+R6j5LbF/eGHLHulxday8Rwh1KOXFkHXm7zfkVY1KTuFxDqUrgHse17SrpNw6makPFu6xVPHntd40seq6h0xZQPRyJpltUwMvCzcnMbEJcWV/aOMfVh8dvJc+bFNvND0uE4qKx8u3ZEJGTxCSJwIrwXHqXpwvdOjkjxWiU2SbA8gvqvDsd6YIi36w/OvHc+HNxlpxR26TPvPv8Aw6wu95AqBICFJU9GUEgCAEox2baoxoK6HCcCgNqoCISJsQhs8Ip7SipAori1uJj9Ome5oLo28zT5FcXH4q34e1p7w9bwPismLjqUrPS06mE+lsGHBEISfxG8zi7ckrw9Q+u+bN/NPd1DNna6g4Urywk26p2Zc9XzrGYjaxLpjy5q6hYzELtMzLmv4k0y05849vGWygOHqFlBpmDeNO7sSWi+i2Q1W7rTGyZJCA6uiTDHml0BxMTndCPJY6ZRMhBPIPFYstrfCnkJ3N+6RHVe7IxgRce6hp8YDcV0bJ+QeDnda96WFsVbTSZ9XRh4rLTBl1P5a7j9Wz8PZfTa129n59MzM7n/AH1OCBIoqBIHBRYG0ULQMKrE20H/2Q=="
                    alt="John Doe"
                    className="w-full h-full object-cover "
                  />
                </div>
                <h3 className="text-lg">Jane Doe</h3>
                <p>CTO</p>
              </div>
              <div className="bg-slate-100 p-4 w-5/6 sm:w-1/2 items-center justify-center flex flex-col">
                <div className="w-full h-40 md:h-48 lg:h-60 bg-black">
                  <Image
                    height={200}
                    width={200}
                    src="data:image/jpeg;base64,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"
                    alt="John Doe"
                    className="w-full h-full object-cover "
                  />
                </div>
                <h3 className="text-lg">James Doe</h3>
                <p>COO</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
