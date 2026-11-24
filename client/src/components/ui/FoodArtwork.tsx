const FoodArtwork = () => (
    <svg viewBox="0 0 560 460" aria-hidden="true" className="food-artwork">
        <defs>
            <linearGradient id="bun-top" x2="0" y2="1"><stop stopColor="#f9c36a" /><stop offset="1" stopColor="#dd852d" /></linearGradient>
            <linearGradient id="bun-bottom" x2="0" y2="1"><stop stopColor="#efa64c" /><stop offset="1" stopColor="#d57b28" /></linearGradient>
            <linearGradient id="patty" x2="0" y2="1"><stop stopColor="#713626" /><stop offset="1" stopColor="#3b201b" /></linearGradient>
        </defs>
        <ellipse cx="285" cy="385" rx="202" ry="23" fill="#aa571d" opacity=".13" />
        <g transform="rotate(-7 280 240)">
            <path d="M100 318 Q275 290 460 318 L445 350 Q275 402 115 350Z" fill="url(#bun-bottom)" />
            <path d="M100 315 Q146 296 190 307 T278 306 T374 306 T460 316 L444 329 Q276 362 115 328Z" fill="#f9cb69" />
            <path d="M90 286 Q118 270 145 280 L163 269 L185 280 L222 266 L248 278 L283 266 L307 279 L337 266 L363 280 L395 268 L423 282 Q450 272 469 289 L448 307 L417 297 L392 309 L362 298 L334 312 L304 302 L276 315 L245 301 L214 315 L182 304 L150 315 L125 299 L101 306Z" fill="#599735" />
            <path d="M107 271 Q265 241 452 268 Q476 287 451 300 Q266 316 107 297 Q86 285 107 271Z" fill="url(#patty)" />
            <path d="M114 272 L185 279 L240 309 L271 280 L335 278 L382 299 L405 274 L449 270 L424 249 L141 249Z" fill="#ffc644" />
            <path d="M112 246 Q267 224 446 244 Q461 253 446 264 Q275 280 113 262 Q93 252 112 246Z" fill="#c84431" />
            <path d="M115 246 Q275 226 445 244" fill="none" stroke="#f47754" strokeWidth="9" strokeLinecap="round" />
            <path d="M100 225 L128 210 L158 218 L185 203 L216 216 L243 201 L275 216 L305 201 L336 213 L365 199 L397 215 L431 208 L461 225 L444 241 L413 234 L382 245 L353 230 L324 242 L294 232 L265 244 L230 232 L200 244 L170 234 L139 243 L108 238Z" fill="#75a943" />
            <path d="M103 214 C101 133 173 84 271 81 C370 78 450 127 457 207 Q286 246 103 214Z" fill="url(#bun-top)" />
            <path d="M128 167 Q163 106 255 102" stroke="#ffda8c" strokeWidth="9" fill="none" strokeLinecap="round" opacity=".7" />
            <g fill="#fff0bb">
                <ellipse cx="178" cy="145" rx="8" ry="3" transform="rotate(-25 178 145)" /><ellipse cx="217" cy="117" rx="8" ry="3" transform="rotate(20 217 117)" />
                <ellipse cx="268" cy="142" rx="8" ry="3" transform="rotate(-30 268 142)" /><ellipse cx="314" cy="115" rx="8" ry="3" transform="rotate(30 314 115)" />
                <ellipse cx="363" cy="153" rx="8" ry="3" transform="rotate(35 363 153)" /><ellipse cx="222" cy="188" rx="8" ry="3" transform="rotate(30 222 188)" />
                <ellipse cx="325" cy="189" rx="8" ry="3" transform="rotate(-30 325 189)" /><ellipse cx="411" cy="190" rx="8" ry="3" transform="rotate(-20 411 190)" />
            </g>
        </g>
        <g fill="#faf0d1" stroke="#d09931" strokeWidth="2"><path d="M427 345 L458 259 L473 263 L443 350Z" /><path d="M450 355 L476 280 L491 285 L465 360Z" /><path d="M472 364 L492 304 L507 309 L487 369Z" /></g>
        <g fill="#c84330"><path d="M81 346 Q62 331 78 315 Q91 310 100 323 Q105 339 81 346" /><path d="M82 345 Q96 350 108 337 Q98 357 82 345" /></g>
        <path d="M72 317 Q81 305 94 316 M82 316 L82 304" fill="none" stroke="#50863a" strokeWidth="5" strokeLinecap="round" />
    </svg>
);
export default FoodArtwork;
