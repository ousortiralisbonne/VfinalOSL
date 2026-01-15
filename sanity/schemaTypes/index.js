import barCategories from './barCategories'
import bars from './bars'
import blockContent from './blockContent'
import blogCategories from './blogCategories'
import blogPosts from './blogPosts'
import clubCategories from './clubCategories'
import clubs from './clubs'
import eventCategories from './eventCategories'
import events from './events'
import hotelCategories from './hotelCategories'
import hotels from './hotels'
import restaurantCategories from './restaurantCategories'
import restaurants from './restaurants'
import vehicles from './vehicles'
import services from './services'
import exploreMore from './exploreMore'
import guidedTours from './guidedTours'
import sports from './sports'
import moreActivities from './moreActivities'
import boatTripLocation from './boatTrip/boatTripLocation'
import boatTripCruiseType from './boatTrip/boatTripCruiseType'
import boatTripCruise from './boatTrip/boatTripCruise'
import pageBanners from './pageBanners'
import siteImages from './siteImages'

const blogElements = [blockContent, blogCategories, blogPosts]
const restaurantsElements = [restaurantCategories, restaurants]
const barsElements = [barCategories, bars]
const clubsElements = [clubCategories, clubs]
const eventsElements = [eventCategories, events]
const hotelsElements = [hotelCategories, hotels]
const transfersElements = [vehicles, services]
const exploreMoreElements = [exploreMore]
const guidedToursElements = [guidedTours]
const boatTripElements = [boatTripLocation, boatTripCruiseType, boatTripCruise]
const sportsElements = [sports]
const moreActivitiesElements = [moreActivities]
const pageBannersElements = [pageBanners]
const siteImagesElements = [siteImages]

export const schemaTypes = [
  ...blogElements,
  ...restaurantsElements,
  ...barsElements,
  ...clubsElements,
  ...eventsElements,
  ...hotelsElements,
  ...transfersElements,
  ...exploreMoreElements,
  ...guidedToursElements,
  ...boatTripElements,
  ...sportsElements,
  ...moreActivitiesElements,
  ...pageBannersElements,
  ...siteImagesElements,
]
