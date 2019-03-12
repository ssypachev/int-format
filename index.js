'use strict';
const READ         = 1,
      CHECK_ARR    = 2,
      ANCHOR       = 3,
      NORMAL_END   = 4,
      PUSH_ANY     = 5,
      PUSH_ARR     = 6,
      PUSH_PAD     = 7,
      READ_AFTER_ANCHOR = 8,
      PUSH_HASH    = 9,
      NEXT_ANCHOR  = 10,
      ABNORMAL_END = 11;

const EMPTY_STRING = "";
const DIGIT_REGEXP = /[\d]/g;

class IntFormat {

    setData (num) {
        if (typeof num === 'string') {
            this.data = num.match(DIGIT_REGEXP);
        } else {
            this.data = num.toString().match(DIGIT_REGEXP);
        }
        this.len = this.data.length;
    }

    constructor ({ format, padWith = EMPTY_STRING, sigil = '#', anchor = '\\' } = {}) {
        this.sig = sigil;
        this.pad = padWith;
        this.anc = anchor;
        if (typeof(arguments[0]) === 'string') {
            this.f = arguments[0];
        } else {
            this.f = format;
        }
    }

    static getReader (string) {
        let str = string, i = 0;
        return () => {
            return str.charAt(i++);
        }
    }

    setFormat (format) {
        this.f = format;
        return this;
    }

    setPad (padWith) {
        this.pad = padWith;
        return this;
    }

    setSigil (sigil) {
        this.sig = sigil;
        return this;
    }

    setAnchor (anchor) {
        this.anc = anchor;
        return this;
    }

    format (num) {
        if (!this.f) {
            throw new TypeError(`format undefined`);
        }
        this.setData(num);
        const read = IntFormat.getReader(this.f);
        let state = READ,
            notFinished = true,
            c = null,
            out = [],
            argCounter = 0,
            charCounter = 0;
        do {
            switch (state) {
                case READ:
                    c = read();
                    charCounter++;
                    switch (c) {
                        case this.sig:
                            state = CHECK_ARR;
                        break;
                        case this.anc:
                            state = READ_AFTER_ANCHOR;
                        break;
                        case EMPTY_STRING:
                            state = NORMAL_END;
                        break;
                        default:
                            state = PUSH_ANY;
                        break;
                    }
                break;
                case PUSH_ANY:
                    out.push(c);
                    state = READ;
                break;
                case CHECK_ARR:
                    if (argCounter < this.len) {
                        state = PUSH_ARR;
                    } else {
                        state = PUSH_PAD;
                    }
                break;
                case PUSH_ARR:
                    out.push(this.data[argCounter++]);
                    state = READ;
                break;
                case PUSH_PAD:
                    out.push(this.pad);
                    state = READ;
                break;
                case READ_AFTER_ANCHOR:
                    c = read();
                    charCounter++;
                    switch (c) {
                        case this.sig:
                            state = PUSH_HASH;
                        break;
                        case this.anc:
                            state = NEXT_ANCHOR;
                        break;
                        case EMPTY_STRING:
                            state = ABNORMAL_END;
                        break;
                        default:
                            state = PUSH_ANY;
                        break;
                    }
                break;
                case PUSH_HASH:
                    out.push(this.sig);
                    state = READ;
                break;
                case NEXT_ANCHOR:
                    out.push(this.anc);
                    state = READ;
                break;
                case ABNORMAL_END:
                    out.push(this.anc);
                    state = NORMAL_END;
                break;
                case NORMAL_END:
                    notFinished = false;
                break;
            }
        } while (notFinished);
        return out.join('');
    }

}

module.exports.IntFormat = IntFormat;





















