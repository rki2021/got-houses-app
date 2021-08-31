export interface House {
    id: number
    url: string
    name: string
    region: string
    coatOfArms: string
    words: string
    titles: Array<string>
    seats: Array<string>
    currentLord: string
    heir: string
    overlord: string
    founded: string
    founder: string
    diedOut: string
    ancestralWeapons: Array<string>
    cadedBranches: Array<string>
    swornMembers: Array<string>
    imageId: number
    overlordName: any
    currentLordName: any
    founderName: any
    swornMemberArr: Array<string>
    rating: number
}