const { create, urlSource  } = require('ipfs-http-client')

// connect to ipfs daemon API server
const ipfs = create('http://localhost:5001')

const addIpfs = async (ipfs) => {
    const file = await ipfs.add(urlSource('https://ipfs.io/images/ipfs-logo.svg'))
    console.log(file);
}

addIpfs(ipfs);