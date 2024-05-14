declare namespace NodeJS {
  export interface ProcessEnv {
    readonly PORT: string;

    readonly PGUSER: string;
    readonly PGPASSWORD: string;
    readonly PGHOST:string;
    readonly PGDATABASE: string;
    readonly PGMAXPOOL: string;
    readonly PGTIMEOUT: string;

    readonly APIURL: string
  }
}