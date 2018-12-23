export interface IHero {
    id: string | any;
    name: string | any;
    desc?: string | any;
}

export class HeroModel implements IHero {
    id: string;
    name: string;
    desc?: string;
    constructor(config: IHero) {
        const { id, name, desc } = config;
        this.id = id;
        this.name = name;
        this.desc = desc;
    }
}
