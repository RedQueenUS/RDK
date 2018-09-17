export default class StringSet {
    constructor(arrayOfStrings) {
        return this.set(arrayOfStrings);
    }

    has(item) {
        return (this.stringSet.includes(item));
    }

    add(item) {
        return this.set((this.has(item)) ? this.stringSet : [...this.stringSet, item]);
    }

    remove(item) {
        return this.set(this.stringSet.filter((member) => {return member !== item;}));
    }

    toggle(item) {
        return (this.has(item)) ? this.remove(item) : this.add(item);
    }

    toArray() {
        return this.stringSet;
    }

    toJson() {
        return JSON.stringify(this.stringSet);
    }

    get() {
        return this.toArray();
    }

    toggleAndReturn(item) {
        return this.toggle(item).get();
    }

    set(strings) {
        if (Array.isArray(strings)) {
            this.stringSet = strings;
        } else if (typeof strings === "string") {
            this.stringSet = [strings];
        } else {
            this.stringSet = [];
        }
        return this;
    }
};