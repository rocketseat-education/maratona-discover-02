import * as sqlite3 from "sqlite3";
import { open } from "sqlite";

const sqlitePath = 'database.sqlite'

export const Database = async () => {
  return open({
    filename: sqlitePath,
    driver: sqlite3.Database,
  })
}