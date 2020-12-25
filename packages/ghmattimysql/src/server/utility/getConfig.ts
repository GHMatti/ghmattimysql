import { parseUrl } from 'mysql/lib/ConnectionConfig';
import { PoolConfig } from 'mysql';

function getConfigFromConnectionString() {
  const connectionString = GetConvar('mysql_connection_string', 'mysql://root@localhost/fivem');
  let cfg = {};
  if (/(?:database|initial\scatalog)=(?:(.*?);|(.*))/gi.test(connectionString)) {
    // replace the old version with the new one
    const connectionStr = connectionString
      .replace(/(?:host|server|data\s?source|addr(?:ess)?)=/gi, 'host=')
      .replace(/(?:port)=/gi, 'port=')
      .replace(/(?:user\s?(?:id|name)?|uid)=/gi, 'user=')
      .replace(/(?:password|pwd)=/gi, 'password=')
      .replace(/(?:database|initial\scatalog)=/gi, 'database=');
    connectionStr.split(';').forEach(c => {
      const equal = c.indexOf('=');
      const key = (equal > -1) ? c.substr(0, equal) : c;
      const value = (equal > -1) ? c.substr(equal + 1) : '';
      cfg = {
        ...cfg,
        [key]: key.includes("port") ? Number(value) : value
      };
    });
  } else if (/mysql:\/\//gi.test(connectionString)) {
    cfg = parseUrl(connectionString);
  }

  return cfg;
}

function getConfig(): PoolConfig {
  const config = JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'config.json'));
  const configFromString = getConfigFromConnectionString();
  return config || configFromString;
}

export default getConfig;
