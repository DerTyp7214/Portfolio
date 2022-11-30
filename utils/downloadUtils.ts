const regex =
  />([0-9K+]{0,})<\/div><div class="[A-Za-z0-9]{0,10}">Downloads<\/div>/g

export function stringToNumber(number: string) {
  if (number.includes('K')) {
    return parseInt(number.replace('K', '')) * 1000
  } else if (number.includes('+')) {
    return parseInt(number.replace('+', '')) + 1
  } else {
    return parseInt(number)
  }
}

export async function playStoreDownloads(packageName: string) {
  try {
    const html = await fetch(
      `https://play.google.com/store/apps/details?id=${packageName}`
    ).then((res) => res.text())
    const result = regex.exec(html.match(regex)?.[0] ?? '')
    return result ? stringToNumber(result[1]) : null
  } catch (e) {
    return null
  }
}

export async function gitHubDownloads(
  owner: string,
  repo: string,
  release: string = 'latest',
  allReleases: boolean = false,
  assetsToCount: (asset: {
    name: string
    download_count: number
    [key: string]: any
  }) => boolean = () => true
) {
  try {
    if (allReleases) {
      const releases = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/releases?per_page=100`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      ).then((res) => res.json())
      return releases
        .map((release: { assets: any[] }) =>
          release.assets
            .filter(assetsToCount)
            .reduce(
              (acc: number, asset: { download_count: number }) =>
                acc + asset.download_count,
              0
            )
        )
        .reduce((acc: number, downloads: number) => acc + downloads, 0)
    } else {
      const releaseData = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/releases/${release}`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      ).then((res) => res.json())
      return releaseData.assets
        .filter(assetsToCount)
        .reduce(
          (acc: number, asset: { download_count: number }) =>
            acc + asset.download_count,
          0
        )
    }
  } catch (e) {
    return 0
  }
}
