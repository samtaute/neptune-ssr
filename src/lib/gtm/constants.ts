// Local storage property names
export const LS_DO_NOT_SELL_MY_INFO = 'mp_dnsmi'
export const LS_DO_NOT_TRACK = 'mp_dnt'
export const LS_IF_AD_TRACKING_FLAG = 'mp_ifadtrk'
export const LS_BRIDGE_MPID = 'mp_uuID'
export const LS_BRIDGE_MPID_INTERNAL = 'int_mp_uuID'

// Base values.
export const BRIDGE_ANDROID_AID        = 'androidAID'
export const BRIDGE_ANDROID_ID         = 'androidID'
export const BRIDGE_APP_BUNDLE         = 'appBundle'
export const BRIDGE_APP_DOMAIN         = 'appDomain'
export const BRIDGE_APP_VERSION_CODE   = 'appVersionCode'
export const BRIDGE_APP_VERSION_MP     = 'mpAppVersion'
export const BRIDGE_CARRIER            = 'carrier'
export const BRIDGE_COUNTRY            = 'country'
export const BRIDGE_DARK_MODE          = 'darkMode'
export const BRIDGE_DNSMI              = 'dnsmi'
export const BRIDGE_DNT                = 'dnt'
export const BRIDGE_IFADTRK            = 'ifadtrk'
export const BRIDGE_LAT                = 'lat'
export const BRIDGE_LNG                = 'lng'
export const BRIDGE_LOCATION_TIMESTAMP = 'lots'
export const BRIDGE_LOC_SOURCE         = 'locSource'
export const BRIDGE_MODE               = 'mode'
export const BRIDGE_SB                 = 'sb'
export const BRIDGE_UUID               = 'uuID'

// Shared data settings.
export const LS_BRIDGE_ANDROID_AID        = `mp_${BRIDGE_ANDROID_AID}`
export const LS_BRIDGE_ANDROID_ID         = `mp_${BRIDGE_ANDROID_ID}`
export const LS_BRIDGE_APP_BUNDLE         = `mp_${BRIDGE_APP_BUNDLE}`
export const LS_BRIDGE_APP_DOMAIN         = `mp_${BRIDGE_APP_DOMAIN}`
export const LS_BRIDGE_APP_VERSION_MP     = `mp_${BRIDGE_APP_VERSION_MP}`
export const LS_BRIDGE_APP_VERSION_CODE   = `mp_${BRIDGE_APP_VERSION_CODE}`
export const LS_BRIDGE_CARRIER            = `mp_${BRIDGE_CARRIER}`
export const LS_BRIDGE_COUNTRY            = `mp_${BRIDGE_COUNTRY}`
export const LS_BRIDGE_DARK_MODE          = `mp_${BRIDGE_DARK_MODE}`
export const LS_BRIDGE_DNSMI              = `mp_${BRIDGE_DNSMI}`
export const LS_BRIDGE_DNT                = `mp_${BRIDGE_DNT}`
export const LS_BRIDGE_IFADTRK            = `mp_${BRIDGE_IFADTRK}`
export const LS_BRIDGE_LAT                = `mp_${BRIDGE_LAT}`
export const LS_BRIDGE_LNG                = `mp_${BRIDGE_LNG}`
export const LS_BRIDGE_LOCATION_TIMESTAMP = `mp_${BRIDGE_LOCATION_TIMESTAMP}`
export const LS_BRIDGE_LOC_SOURCE         = `mp_${BRIDGE_LOC_SOURCE}`
export const LS_BRIDGE_MODE               = `mp_${BRIDGE_MODE}`
export const LS_BRIDGE_SB                 = `mp_${BRIDGE_SB}`
export const LS_BRIDGE_UUID               = `mp_${BRIDGE_UUID}`

// Internal only data settings.
export const LS_BRIDGE_ANDROID_AID_INTERNAL      = `int_mp_${BRIDGE_ANDROID_AID}`
export const LS_BRIDGE_ANDROID_ID_INTERNAL       = `int_mp_${BRIDGE_ANDROID_ID}`
export const LS_BRIDGE_APP_BUNDLE_INTERNAL       = `int_mp_${BRIDGE_APP_BUNDLE}`
export const LS_BRIDGE_APP_DOMAIN_INTERNAL       = `int_mp_${BRIDGE_APP_DOMAIN}`
export const LS_BRIDGE_APP_VERSION_CODE_INTERNAL = `int_mp_${BRIDGE_APP_VERSION_CODE}`
export const LS_BRIDGE_APP_VERSION_MP_INTERNAL   = `int_mp_${BRIDGE_APP_VERSION_MP}`
export const LS_BRIDGE_CARRIER_INTERNAL          = `int_mp_${BRIDGE_CARRIER}`
export const LS_BRIDGE_COUNTRY_INTERNAL          = `int_mp_${BRIDGE_COUNTRY}`
export const LS_BRIDGE_DARK_MODE_INTERNAL        = `int_mp_${BRIDGE_DARK_MODE}`
export const LS_BRIDGE_DNSMI_INTERNAL            = `int_mp_${BRIDGE_DNSMI}`
export const LS_BRIDGE_DNT_INTERNAL              = `int_mp_${BRIDGE_DNT}`
export const LS_BRIDGE_IFADTRK_INTERNAL          = `int_mp_${BRIDGE_IFADTRK}`
export const LS_BRIDGE_LOC_SOURCE_INTERNAL       = `int_mp_${BRIDGE_LOC_SOURCE}`
export const LS_BRIDGE_MODE_INTERNAL             = `int_mp_${BRIDGE_MODE}`
export const LS_BRIDGE_SB_INTERNAL               = `int_mp_${BRIDGE_SB}`
export const LS_BRIDGE_UUID_INTERNAL             = `int_mp_${BRIDGE_UUID}`

// This is key that's used in the DNSMI cookie.
export const LS_BRIDGE_DNSMI_LOCAL = 'local_mp_dnsmi'

// TODO: These two should not be used (bridge sets it but querystring does not).
export const BRIDGE_APP_VER             = 'appVer'
export const LS_BRIDGE_APP_VER          = `mp_${BRIDGE_APP_VER}`
export const LS_BRIDGE_APP_VER_INTERNAL = `int_mp_${BRIDGE_APP_VER}`
