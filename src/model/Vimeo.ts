/* eslint-disable camelcase,@typescript-eslint/no-explicit-any */
export interface VimeoVideo {
  uri: string;
  name: string;
  description: null;
  type: string;
  link: string;
  duration: number;
  width: number;
  language: null;
  height: number;
  embed: Embed;
  created_time: Date;
  modified_time: Date;
  release_time: Date;
  content_rating: string[];
  license: null;
  privacy: Privacy;
  pictures: Pictures;
  tags: any[];
  stats: Stats;
  categories: any[];
  metadata: VimeoVideoMetadata;
  user: User;
  parent_folder: null;
  last_user_action_event_date: Date;
  review_page: ReviewPage;
  app: App;
  status: string;
  resource_key: string;
  upload: Upload;
  transcode: Transcode;
  is_playable: boolean;
}

export interface App {
  name: string;
  uri: string;
}

export interface Embed {
  buttons: Buttons;
  logos: Logos;
  title: Title;
  playbar: boolean;
  volume: boolean;
  speed: boolean;
  color: string;
  uri: null;
  html: string;
  badges: Badges;
}

export interface Badges {
  hdr: boolean;
  live: Live;
  staff_pick: StaffPick;
  vod: boolean;
  weekend_challenge: boolean;
}

export interface Live {
  streaming: boolean;
  archived: boolean;
}

export interface StaffPick {
  normal: boolean;
  best_of_the_month: boolean;
  best_of_the_year: boolean;
  premiere: boolean;
}

export interface Buttons {
  like: boolean;
  watchlater: boolean;
  share: boolean;
  embed: boolean;
  hd: boolean;
  fullscreen: boolean;
  scaling: boolean;
}

export interface Logos {
  vimeo: boolean;
  custom: Custom;
}

export interface Custom {
  active: boolean;
  url: null;
  link: null;
  sticky: boolean;
}

export interface Title {
  name: string;
  owner: string;
  portrait: string;
}

export interface VimeoVideoMetadata {
  connections: PurpleConnections;
  interactions: Interactions;
  is_vimeo_create: boolean;
  is_screen_record: boolean;
}

export interface PurpleConnections {
  comments: Albums;
  credits: Albums;
  likes: Albums;
  pictures: Albums;
  texttracks: Albums;
  related: Recommendations | null;
  recommendations: Recommendations;
  albums: Albums;
  available_albums: Albums;
  available_channels: Albums;
}

export interface Albums {
  uri: string;
  options: AlbumsOption[];
  total: number;
}

export enum AlbumsOption {
  Get = "GET",
  Patch = "PATCH",
  Post = "POST",
}

export interface Recommendations {
  uri: string;
  options: RecommendationsOption[];
}

export enum RecommendationsOption {
  Delete = "DELETE",
  Get = "GET",
  Patch = "PATCH",
}

export interface Interactions {
  watchlater: Watchlater;
  report: Report;
  view_team_members: Recommendations;
  edit: Recommendations;
  delete: Recommendations;
}

export interface Report {
  uri: string;
  options: AlbumsOption[];
  reason: string[];
}

export interface Watchlater {
  uri: string;
  options: string[];
  added: boolean;
  added_time: null;
}

export interface Pictures {
  uri: null | string;
  active: boolean;
  type: string;
  sizes: Size[];
  resource_key: string;
  default_picture: boolean;
}

export interface Size {
  width: number;
  height: number;
  link: string;
  link_with_play_button?: string;
}

export interface Privacy {
  view: string;
  embed: string;
  download: boolean;
  add: boolean;
  comments: string;
}

export interface ReviewPage {
  active: boolean;
  link: string;
}

export interface Stats {
  plays: number;
}

export interface Transcode {
  status: string;
}

export interface Upload {
  status: string;
  upload_link: null;
  form: null;
  complete_uri: null;
  approach: null | string;
  size: null;
  redirect_url: null;
  link: null;
}

export interface User {
  uri: string;
  name: string;
  link: string;
  capabilities: Capabilities;
  location: string;
  gender: string;
  bio: null;
  short_bio: null;
  created_time: Date;
  pictures: Pictures;
  websites: any[];
  metadata: UserMetadata;
  location_details: LocationDetails;
  skills: any[];
  available_for_hire: boolean;
  can_work_remotely: boolean;
  preferences: Preferences;
  content_filter: string[];
  upload_quota: UploadQuota;
  resource_key: string;
  account: string;
}

export interface Capabilities {
  hasLiveSubscription: boolean;
}

export interface LocationDetails {
  formatted_address: string;
  latitude: null;
  longitude: null;
  city: null;
  state: null;
  neighborhood: null;
  sub_locality: null;
  state_iso_code: null;
  country: null;
  country_iso_code: null;
}

export interface UserMetadata {
  connections: FluffyConnections;
}

export interface FluffyConnections {
  albums: Albums;
  appearances: Albums;
  categories: Albums;
  channels: Albums;
  feed: Recommendations;
  followers: Albums;
  following: Albums;
  groups: Albums;
  likes: Albums;
  membership: Recommendations;
  moderated_channels: Albums;
  portfolios: Albums;
  videos: Albums;
  watchlater: Albums;
  shared: Albums;
  pictures: Albums;
  watched_videos: Albums;
  folders_root: Recommendations;
  folders: Albums;
  teams: Albums;
  block: Albums;
}

export interface Preferences {
  videos: Videos;
}

export interface Videos {
  privacy: Privacy;
}

export interface UploadQuota {
  space: Lifetime;
  periodic: Lifetime;
  lifetime: Lifetime;
}

export interface Lifetime {
  free: number;
  max: number;
  used: number;
  reset_date?: Date;
  showing?: string;
}
