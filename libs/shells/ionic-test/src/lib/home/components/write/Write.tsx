import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
} from '@ionic/react';

import {
  accessibilityOutline,
  addCircleOutline,
  addOutline,
  airplaneOutline,
  alarmOutline,
  albumsOutline,
  alertCircleOutline,
  alertOutline,
  americanFootballOutline,
  analyticsOutline,
  apertureOutline,
  appsOutline,
  archiveOutline,
  arrowBackCircleOutline,
  arrowBackOutline,
  arrowDownCircleOutline,
  arrowDownOutline,
  arrowForwardCircleOutline,
  arrowForwardOutline,
  arrowRedoCircleOutline,
  arrowRedoOutline,
  arrowUndoCircleOutline,
  arrowUndoOutline,
  arrowUpCircleOutline,
  arrowUpOutline,
  atCircleOutline,
  atOutline,
  attachOutline,
  backspaceOutline,
  bagAddOutline,
  bagCheckOutline,
  bagHandleOutline,
  bagOutline,
  bagRemoveOutline,
  balloonOutline,
  banOutline,
  bandageOutline,
  barChartOutline,
  barbellOutline,
  barcodeOutline,
  baseballOutline,
  basketOutline,
  basketballOutline,
  batteryChargingOutline,
  batteryDeadOutline,
  batteryFullOutline,
  batteryHalfOutline,
  beakerOutline,
  bedOutline,
  beerOutline,
  bicycleOutline,
  bluetoothOutline,
  boatOutline,
  bodyOutline,
  bonfireOutline,
  bookOutline,
  bookmarkOutline,
  bookmarksOutline,
  bowlingBallOutline,
  briefcaseOutline,
  browsersOutline,
  brushOutline,
  bugOutline,
  buildOutline,
  bulbOutline,
  busOutline,
  businessOutline,
  cafeOutline,
  calculatorOutline,
  calendarClearOutline,
  calendarNumberOutline,
  calendarOutline,
  callOutline,
  cameraOutline,
  cameraReverseOutline,
  carOutline,
  carSportOutline,
  cardOutline,
  caretBackCircleOutline,
  caretBackOutline,
  caretDownCircleOutline,
  caretDownOutline,
  caretForwardCircleOutline,
  caretForwardOutline,
  caretUpCircleOutline,
  caretUpOutline,
  cartOutline,
  cashOutline,
  cellularOutline,
  chatboxEllipsesOutline,
  chatboxOutline,
  chatbubbleEllipsesOutline,
  chatbubbleOutline,
  chatbubblesOutline,
  checkboxOutline,
  checkmarkCircleOutline,
  checkmarkDoneCircleOutline,
  checkmarkDoneOutline,
  checkmarkOutline,
  chevronBackCircleOutline,
  chevronBackOutline,
  chevronCollapseOutline,
  chevronDownCircleOutline,
  chevronDownOutline,
  chevronExpandOutline,
  chevronForwardCircleOutline,
  chevronForwardOutline,
  chevronUpCircleOutline,
  chevronUpOutline,
  clipboardOutline,
  closeCircleOutline,
  closeOutline,
  cloudCircleOutline,
  cloudDoneOutline,
  cloudDownloadOutline,
  cloudOfflineOutline,
  cloudOutline,
  cloudUploadOutline,
  cloudyNightOutline,
  cloudyOutline,
  codeDownloadOutline,
  codeOutline,
  codeSlashOutline,
  codeWorkingOutline,
  cogOutline,
  colorFillOutline,
  colorFilterOutline,
  colorPaletteOutline,
  colorWandOutline,
  compassOutline,
  constructOutline,
  contractOutline,
  contrastOutline,
  copyOutline,
  createOutline,
  cropOutline,
  cubeOutline,
  cutOutline,
  desktopOutline,
  diamondOutline,
  diceOutline,
  discOutline,
  documentAttachOutline,
  documentLockOutline,
  documentOutline,
  documentTextOutline,
  documentsOutline,
  downloadOutline,
  duplicateOutline,
  earOutline,
  earthOutline,
  easelOutline,
  eggOutline,
  ellipseOutline,
  ellipsisHorizontalCircleOutline,
  ellipsisHorizontalOutline,
  ellipsisVerticalCircleOutline,
  ellipsisVerticalOutline,
  enterOutline,
  exitOutline,
  expandOutline,
  extensionPuzzleOutline,
  eyeOffOutline,
  eyeOutline,
  eyedropOutline,
  fastFoodOutline,
  femaleOutline,
  fileTrayFullOutline,
  fileTrayOutline,
  fileTrayStackedOutline,
  filmOutline,
  filterCircleOutline,
  filterOutline,
  fingerPrintOutline,
  fishOutline,
  fitnessOutline,
  flagOutline,
  flameOutline,
  flashOffOutline,
  flashOutline,
  flashlightOutline,
  flaskOutline,
  flowerOutline,
  folderOpenOutline,
  folderOutline,
  footballOutline,
  footstepsOutline,
  funnelOutline,
  gameControllerOutline,
  giftOutline,
  gitBranchOutline,
  gitCommitOutline,
  gitCompareOutline,
  gitMergeOutline,
  gitNetworkOutline,
  gitPullRequestOutline,
  glassesOutline,
  globeOutline,
  golfOutline,
  gridOutline,
  hammerOutline,
  handLeftOutline,
  handRightOutline,
  happyOutline,
  hardwareChipOutline,
  headsetOutline,
  heartCircleOutline,
  heartDislikeCircleOutline,
  heartDislikeOutline,
  heartHalfOutline,
  heartOutline,
  helpBuoyOutline,
  helpCircleOutline,
  helpOutline,
  homeOutline,
  hourglassOutline,
  iceCreamOutline,
  idCardOutline,
  imageOutline,
  imagesOutline,
  infiniteOutline,
  informationCircleOutline,
  informationOutline,
  invertModeOutline,
  journalOutline,
  keyOutline,
  keypadOutline,
  languageOutline,
  laptopOutline,
  layersOutline,
  leafOutline,
  libraryOutline,
  linkOutline,
  listCircleOutline,
  listOutline,
  locateOutline,
  locationOutline,
  lockClosedOutline,
  lockOpenOutline,
  logInOutline,
  logOut,
  logoAlipay,
  logoAmazon,
  logoAmplify,
  logoAndroid,
  logoAngular,
  logoApple,
  logoAppleAppstore,
  logoAppleAr,
  logoBehance,
  logoBitbucket,
  logoBitcoin,
  logoBuffer,
  logoCapacitor,
  logoChrome,
  logoClosedCaptioning,
  logoCodepen,
  logoCss3,
  logoDesignernews,
  logoDeviantart,
  logoDiscord,
  logoDocker,
  logoDribbble,
  logoDropbox,
  logoEdge,
  logoElectron,
  logoEuro,
  logoFacebook,
  logoFigma,
  logoFirebase,
  logoFirefox,
  logoFlickr,
  logoFoursquare,
  logoGithub,
  logoGitlab,
  logoGoogle,
  logoGooglePlaystore,
  logoHackernews,
  logoHtml5,
  logoInstagram,
  logoIonic,
  logoIonitron,
  logoJavascript,
  logoLaravel,
  logoLinkedin,
  logoMarkdown,
  logoMastodon,
  logoMedium,
  logoMicrosoft,
  logoNoSmoking,
  logoNodejs,
  logoNpm,
  logoOctocat,
  logoPaypal,
  logoPinterest,
  logoPlaystation,
  logoPwa,
  logoPython,
  logoReact,
  logoReddit,
  logoRss,
  logoSass,
  logoSkype,
  logoSlack,
  logoSnapchat,
  logoSoundcloud,
  logoStackoverflow,
  logoSteam,
  logoStencil,
  logoTableau,
  logoTiktok,
  logoTumblr,
  logoTux,
  logoTwitch,
  logoTwitter,
  logoUsd,
  logoVenmo,
  logoVercel,
  logoVimeo,
  logoVk,
  logoVue,
  logoWebComponent,
  logoWechat,
  logoWhatsapp,
  logoWindows,
  logoWordpress,
  logoXbox,
  logoXing,
  logoYahoo,
  logoYen,
  logoYoutube,
  magnetOutline,
  mailOpenOutline,
  mailOutline,
  mailUnreadOutline,
  maleFemaleOutline,
  maleOutline,
  manOutline,
  mapOutline,
  medalOutline,
  medicalOutline,
  medkitOutline,
  megaphoneOutline,
  menuOutline,
  micCircleOutline,
  micOffCircleOutline,
  micOffOutline,
  micOutline,
  moonOutline,
  moveOutline,
  musicalNoteOutline,
  musicalNotesOutline,
  navigateCircleOutline,
  navigateOutline,
  newspaperOutline,
  notificationsCircleOutline,
  notificationsOffCircleOutline,
  notificationsOffOutline,
  notificationsOutline,
  nuclearOutline,
  nutritionOutline,
  openOutline,
  optionsOutline,
  paperPlaneOutline,
  partlySunnyOutline,
  pauseCircleOutline,
  pauseOutline,
  pawOutline,
  pencilOutline,
  peopleCircleOutline,
  peopleOutline,
  personAddOutline,
  personCircleOutline,
  personOutline,
  personRemoveOutline,
  phoneLandscapeOutline,
  phonePortraitOutline,
  pieChartOutline,
  pinOutline,
  pintOutline,
  pizzaOutline,
  planetOutline,
  playBackCircleOutline,
  playBackOutline,
  playCircleOutline,
  playForwardCircleOutline,
  playForwardOutline,
  playOutline,
  playSkipBackCircleOutline,
  playSkipBackOutline,
  playSkipForwardCircleOutline,
  playSkipForwardOutline,
  podiumOutline,
  powerOutline,
  pricetagOutline,
  pricetagsOutline,
  printOutline,
  prismOutline,
  pulseOutline,
  pushOutline,
  qrCodeOutline,
  radioButtonOffOutline,
  radioButtonOnOutline,
  radioOutline,
  rainyOutline,
  readerOutline,
  receiptOutline,
  recordingOutline,
  refreshCircleOutline,
  refreshOutline,
  reloadCircleOutline,
  reloadOutline,
  removeCircleOutline,
  removeOutline,
  reorderFourOutline,
  reorderThreeOutline,
  reorderTwoOutline,
  repeatOutline,
  resizeOutline,
  restaurantOutline,
  returnDownBackOutline,
  returnDownForwardOutline,
  returnUpBackOutline,
  returnUpForwardOutline,
  ribbonOutline,
  rocketOutline,
  roseOutline,
  sadOutline,
  saveOutline,
  scaleOutline,
  scanCircleOutline,
  scanOutline,
  schoolOutline,
  searchCircleOutline,
  searchOutline,
  sendOutline,
  serverOutline,
  settingsOutline,
  shapesOutline,
  shareOutline,
  shareSocialOutline,
  shieldCheckmarkOutline,
  shieldHalfOutline,
  shieldOutline,
  shirtOutline,
  shuffleOutline,
  skullOutline,
  snowOutline,
  sparklesOutline,
  speedometerOutline,
  squareOutline,
  starHalfOutline,
  starOutline,
  statsChartOutline,
  stopCircleOutline,
  stopOutline,
  stopwatchOutline,
  storefrontOutline,
  subwayOutline,
  sunnyOutline,
  swapHorizontalOutline,
  swapVerticalOutline,
  syncCircleOutline,
  syncOutline,
  tabletLandscapeOutline,
  tabletPortraitOutline,
  telescopeOutline,
  tennisballOutline,
  terminalOutline,
  textOutline,
  thermometerOutline,
  thumbsDownOutline,
  thumbsUpOutline,
  thunderstormOutline,
  ticketOutline,
  timeOutline,
  timerOutline,
  todayOutline,
  toggleOutline,
  trailSignOutline,
  trainOutline,
  transgenderOutline,
  trashBinOutline,
  trashOutline,
  trendingDownOutline,
  trendingUpOutline,
  triangleOutline,
  trophyOutline,
  tvOutline,
  umbrellaOutline,
  unlinkOutline,
  videocamOffOutline,
  videocamOutline,
  volumeHighOutline,
  volumeLowOutline,
  volumeMediumOutline,
  volumeMuteOutline,
  volumeOffOutline,
  walkOutline,
  walletOutline,
  warningOutline,
  watchOutline,
  waterOutline,
  wifiOutline,
  wineOutline,
  womanOutline,
} from 'ionicons/icons';

export const Write = () => {
  return (
    <>
      <IonList>
        <IonItemSliding>
          <IonItemOptions side="start">
            <IonItemOption color="success">
              <IonIcon slot="icon-only" icon={archiveOutline}></IonIcon>
            </IonItemOption>
          </IonItemOptions>

          <IonItem>
            <IonLabel>Sliding Item with Icons Only</IonLabel>
          </IonItem>

          <IonItemOptions side="end">
            <IonItemOption>
              <IonIcon slot="icon-only" icon={heartOutline}></IonIcon>
            </IonItemOption>
            <IonItemOption color="danger">
              <IonIcon slot="icon-only" icon={trashOutline}></IonIcon>
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>

        <IonItemSliding>
          <IonItemOptions side="start">
            <IonItemOption color="success">
              <IonIcon slot="start" icon={archiveOutline}></IonIcon>
              Archive
            </IonItemOption>
          </IonItemOptions>

          <IonItem>
            <IonLabel>Sliding Item with Start Icons</IonLabel>
          </IonItem>

          <IonItemOptions side="end">
            <IonItemOption>
              <IonIcon slot="start" icon={heartOutline}></IonIcon>
              Favorite
            </IonItemOption>
            <IonItemOption color="danger">
              <IonIcon slot="start" icon={trashOutline}></IonIcon>
              Delete
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>

        <IonItemSliding>
          <IonItemOptions side="start">
            <IonItemOption color="success">
              <IonIcon slot="end" icon={archiveOutline}></IonIcon>
              Archive
            </IonItemOption>
          </IonItemOptions>

          <IonItem>
            <IonLabel>Sliding Item with End Icons</IonLabel>
          </IonItem>

          <IonItemOptions>
            <IonItemOption>
              <IonIcon slot="end" icon={heartOutline}></IonIcon>
              Favorite
            </IonItemOption>
            <IonItemOption color="danger">
              <IonIcon slot="end" icon={trashOutline}></IonIcon>
              Delete
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>

        <IonItemSliding>
          <IonItemOptions side="start">
            <IonItemOption color="success">
              <IonIcon slot="top" icon={archiveOutline}></IonIcon>
              Archive
            </IonItemOption>
          </IonItemOptions>

          <IonItem>
            <IonLabel>Sliding Item with Top Icons</IonLabel>
          </IonItem>

          <IonItemOptions>
            <IonItemOption>
              <IonIcon slot="top" icon={heartOutline}></IonIcon>
              Favorite
            </IonItemOption>
            <IonItemOption color="danger">
              <IonIcon slot="top" icon={trashOutline}></IonIcon>
              Delete
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>

        <IonItemSliding>
          <IonItemOptions side="start">
            <IonItemOption color="success">
              <IonIcon slot="bottom" icon={archiveOutline}></IonIcon>
              Archive
            </IonItemOption>
          </IonItemOptions>

          <IonItem>
            <IonLabel>Sliding Item with Bottom Icons</IonLabel>
          </IonItem>

          <IonItemOptions>
            <IonItemOption>
              <IonIcon slot="bottom" icon={heartOutline}></IonIcon>
              Favorite
            </IonItemOption>
            <IonItemOption color="danger">
              <IonIcon slot="bottom" icon={trashOutline}></IonIcon>
              Delete
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>

        <IonItem>
          <IonIcon icon={accessibilityOutline}></IonIcon>
          <div>accessibility</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={addOutline}></IonIcon>
          <div>add</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={addCircleOutline}></IonIcon>
          <div>addCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={airplaneOutline}></IonIcon>
          <div>airplane</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={alarmOutline}></IonIcon>
          <div>alarm</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={albumsOutline}></IonIcon>
          <div>albums</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={alertOutline}></IonIcon>
          <div>alert</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={alertCircleOutline}></IonIcon>
          <div>alertCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={americanFootballOutline}></IonIcon>
          <div>americanFootball</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={analyticsOutline}></IonIcon>
          <div>analytics</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={apertureOutline}></IonIcon>
          <div>aperture</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={appsOutline}></IonIcon>
          <div>apps</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={archiveOutline}></IonIcon>
          <div>archive</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={arrowBackOutline}></IonIcon>
          <div>arrowBack</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={arrowBackCircleOutline}></IonIcon>
          <div>arrowBackCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={arrowDownOutline}></IonIcon>
          <div>arrowDown</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={arrowDownCircleOutline}></IonIcon>
          <div>arrowDownCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={arrowForwardOutline}></IonIcon>
          <div>arrowForward</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={arrowForwardCircleOutline}></IonIcon>
          <div>arrowForwardCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={arrowRedoOutline}></IonIcon>
          <div>arrowRedo</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={arrowRedoCircleOutline}></IonIcon>
          <div>arrowRedoCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={arrowUndoOutline}></IonIcon>
          <div>arrowUndo</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={arrowUndoCircleOutline}></IonIcon>
          <div>arrowUndoCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={arrowUpOutline}></IonIcon>
          <div>arrowUp</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={arrowUpCircleOutline}></IonIcon>
          <div>arrowUpCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={atOutline}></IonIcon>
          <div>at</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={atCircleOutline}></IonIcon>
          <div>atCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={attachOutline}></IonIcon>
          <div>attach</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={backspaceOutline}></IonIcon>
          <div>backspace</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bagOutline}></IonIcon>
          <div>bag</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={bagAddOutline}></IonIcon>
          <div>bagAdd</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bagCheckOutline}></IonIcon>
          <div>bagCheck</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bagHandleOutline}></IonIcon>
          <div>bagHandle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bagRemoveOutline}></IonIcon>
          <div>bagRemove</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={balloonOutline}></IonIcon>
          <div>balloon</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={banOutline}></IonIcon>
          <div>ban</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bandageOutline}></IonIcon>
          <div>bandage</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={barChartOutline}></IonIcon>
          <div>barChart</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={barbellOutline}></IonIcon>
          <div>barbell</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={barcodeOutline}></IonIcon>
          <div>barcode</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={baseballOutline}></IonIcon>
          <div>baseball</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={basketOutline}></IonIcon>
          <div>basket</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={basketballOutline}></IonIcon>
          <div>basketball</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={batteryChargingOutline}></IonIcon>
          <div>batteryCharging</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={batteryDeadOutline}></IonIcon>
          <div>batteryDead</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={batteryFullOutline}></IonIcon>
          <div>batteryFull</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={batteryHalfOutline}></IonIcon>
          <div>batteryHalf</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={beakerOutline}></IonIcon>
          <div>beaker</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bedOutline}></IonIcon>
          <div>bed</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={beerOutline}></IonIcon>
          <div>beer</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bicycleOutline}></IonIcon>
          <div>bicycle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bluetoothOutline}></IonIcon>
          <div>bluetooth</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={boatOutline}></IonIcon>
          <div>boat</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bodyOutline}></IonIcon>
          <div>body</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bonfireOutline}></IonIcon>
          <div>bonfire</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bookOutline}></IonIcon>
          <div>book</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bookmarkOutline}></IonIcon>
          <div>bookmark</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bookmarksOutline}></IonIcon>
          <div>bookmarks</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bowlingBallOutline}></IonIcon>
          <div>bowlingBall</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={briefcaseOutline}></IonIcon>
          <div>briefcase</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={browsersOutline}></IonIcon>
          <div>browsers</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={brushOutline}></IonIcon>
          <div>brush</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bugOutline}></IonIcon>
          <div>bug</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={buildOutline}></IonIcon>
          <div>build</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={bulbOutline}></IonIcon>
          <div>bulb</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={busOutline}></IonIcon>
          <div>bus</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={businessOutline}></IonIcon>
          <div>business</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cafeOutline}></IonIcon>
          <div>cafe</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={calculatorOutline}></IonIcon>
          <div>calculator</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={calendarOutline}></IonIcon>
          <div>calendar</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={calendarClearOutline}></IonIcon>
          <div>calendarClear</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={calendarNumberOutline}></IonIcon>
          <div>calendarNumber</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={callOutline}></IonIcon>
          <div>call</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cameraOutline}></IonIcon>
          <div>camera</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cameraReverseOutline}></IonIcon>
          <div>cameraReverse</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={carOutline}></IonIcon>
          <div>car</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={carSportOutline}></IonIcon>
          <div>carSport</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cardOutline}></IonIcon>
          <div>card</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={caretBackOutline}></IonIcon>
          <div>caretBack</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={caretBackCircleOutline}></IonIcon>
          <div>caretBackCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={caretDownOutline}></IonIcon>
          <div>caretDown</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={caretDownCircleOutline}></IonIcon>
          <div>caretDownCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={caretForwardOutline}></IonIcon>
          <div>caretForward</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={caretForwardCircleOutline}></IonIcon>
          <div>caretForwardCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={caretUpOutline}></IonIcon>
          <div>caretUp</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={caretUpCircleOutline}></IonIcon>
          <div>caretUpCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cartOutline}></IonIcon>
          <div>cart</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cashOutline}></IonIcon>
          <div>cash</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cellularOutline}></IonIcon>
          <div>cellular</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={chatboxOutline}></IonIcon>
          <div>chatbox</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={chatboxEllipsesOutline}></IonIcon>
          <div>chatboxEllipses</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={chatbubbleOutline}></IonIcon>
          <div>chatbubble</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={chatbubbleEllipsesOutline}></IonIcon>
          <div>chatbubbleEllipses</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={chatbubblesOutline}></IonIcon>
          <div>chatbubbles</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={checkboxOutline}></IonIcon>
          <div>checkbox</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={checkmarkOutline}></IonIcon>
          <div>checkmark</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={checkmarkCircleOutline}></IonIcon>
          <div>checkmarkCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={checkmarkDoneOutline}></IonIcon>
          <div>checkmarkDone</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={checkmarkDoneCircleOutline}></IonIcon>
          <div>checkmarkDoneCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={chevronBackOutline}></IonIcon>
          <div>chevronBack</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={chevronBackCircleOutline}></IonIcon>
          <div>chevronBackCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={chevronCollapseOutline}></IonIcon>
          <div>chevronCollapse</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={chevronDownOutline}></IonIcon>
          <div>chevronDown</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={chevronDownCircleOutline}></IonIcon>
          <div>chevronDownCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={chevronExpandOutline}></IonIcon>
          <div>chevronExpand</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={chevronForwardOutline}></IonIcon>
          <div>chevronForward</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={chevronForwardCircleOutline}></IonIcon>
          <div>chevronForwardCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={chevronUpOutline}></IonIcon>
          <div>chevronUp</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={chevronUpCircleOutline}></IonIcon>
          <div>chevronUpCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={clipboardOutline}></IonIcon>
          <div>clipboard</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={closeOutline}></IonIcon>
          <div>close</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={closeCircleOutline}></IonIcon>
          <div>closeCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cloudOutline}></IonIcon>
          <div>cloud</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={cloudCircleOutline}></IonIcon>
          <div>cloudCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cloudDoneOutline}></IonIcon>
          <div>cloudDone</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cloudDownloadOutline}></IonIcon>
          <div>cloudDownload</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cloudOfflineOutline}></IonIcon>
          <div>cloudOffline</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cloudUploadOutline}></IonIcon>
          <div>cloudUpload</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cloudyOutline}></IonIcon>
          <div>cloudy</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={cloudyNightOutline}></IonIcon>
          <div>cloudyNight</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={codeOutline}></IonIcon>
          <div>code</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={codeDownloadOutline}></IonIcon>
          <div>codeDownload</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={codeSlashOutline}></IonIcon>
          <div>codeSlash</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={codeWorkingOutline}></IonIcon>
          <div>codeWorking</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cogOutline}></IonIcon>
          <div>cog</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={colorFillOutline}></IonIcon>
          <div>colorFill</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={colorFilterOutline}></IonIcon>
          <div>colorFilter</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={colorPaletteOutline}></IonIcon>
          <div>colorPalette</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={colorWandOutline}></IonIcon>
          <div>colorWand</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={compassOutline}></IonIcon>
          <div>compass</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={constructOutline}></IonIcon>
          <div>construct</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={contractOutline}></IonIcon>
          <div>contract</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={contrastOutline}></IonIcon>
          <div>contrast</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={copyOutline}></IonIcon>
          <div>copy</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={createOutline}></IonIcon>
          <div>create</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cropOutline}></IonIcon>
          <div>crop</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cubeOutline}></IonIcon>
          <div>cube</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={cutOutline}></IonIcon>
          <div>cut</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={desktopOutline}></IonIcon>
          <div>desktop</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={diamondOutline}></IonIcon>
          <div>diamond</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={diceOutline}></IonIcon>
          <div>dice</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={discOutline}></IonIcon>
          <div>disc</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={documentOutline}></IonIcon>
          <div>document</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={documentAttachOutline}></IonIcon>
          <div>documentAttach</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={documentLockOutline}></IonIcon>
          <div>documentLock</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={documentTextOutline}></IonIcon>
          <div>documentText</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={documentsOutline}></IonIcon>
          <div>documents</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={downloadOutline}></IonIcon>
          <div>download</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={duplicateOutline}></IonIcon>
          <div>duplicate</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={earOutline}></IonIcon>
          <div>ear</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={earthOutline}></IonIcon>
          <div>earth</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={easelOutline}></IonIcon>
          <div>easel</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={eggOutline}></IonIcon>
          <div>egg</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={ellipseOutline}></IonIcon>
          <div>ellipse</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={ellipsisHorizontalOutline}></IonIcon>
          <div>ellipsisHorizontal</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={ellipsisHorizontalCircleOutline}></IonIcon>
          <div>ellipsisHorizontalCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={ellipsisVerticalOutline}></IonIcon>
          <div>ellipsisVertical</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={ellipsisVerticalCircleOutline}></IonIcon>
          <div>ellipsisVerticalCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={enterOutline}></IonIcon>
          <div>enter</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={exitOutline}></IonIcon>
          <div>exit</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={expandOutline}></IonIcon>
          <div>expand</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={extensionPuzzleOutline}></IonIcon>
          <div>extensionPuzzle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={eyeOutline}></IonIcon>
          <div>eye</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={eyeOffOutline}></IonIcon>
          <div>eyeOff</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={eyedropOutline}></IonIcon>
          <div>eyedrop</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={fastFoodOutline}></IonIcon>
          <div>fastFood</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={femaleOutline}></IonIcon>
          <div>female</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={fileTrayOutline}></IonIcon>
          <div>fileTray</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={fileTrayFullOutline}></IonIcon>
          <div>fileTrayFull</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={fileTrayStackedOutline}></IonIcon>
          <div>fileTrayStacked</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={filmOutline}></IonIcon>
          <div>film</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={filterOutline}></IonIcon>
          <div>filter</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={filterCircleOutline}></IonIcon>
          <div>filterCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={fingerPrintOutline}></IonIcon>
          <div>fingerPrint</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={fishOutline}></IonIcon>
          <div>fish</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={fitnessOutline}></IonIcon>
          <div>fitness</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={flagOutline}></IonIcon>
          <div>flag</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={flameOutline}></IonIcon>
          <div>flame</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={flashOutline}></IonIcon>
          <div>flash</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={flashOffOutline}></IonIcon>
          <div>flashOff</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={flashlightOutline}></IonIcon>
          <div>flashlight</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={flaskOutline}></IonIcon>
          <div>flask</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={flowerOutline}></IonIcon>
          <div>flower</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={folderOutline}></IonIcon>
          <div>folder</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={folderOpenOutline}></IonIcon>
          <div>folderOpen</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={footballOutline}></IonIcon>
          <div>football</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={footstepsOutline}></IonIcon>
          <div>footsteps</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={funnelOutline}></IonIcon>
          <div>funnel</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={gameControllerOutline}></IonIcon>
          <div>gameController</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={giftOutline}></IonIcon>
          <div>gift</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={gitBranchOutline}></IonIcon>
          <div>gitBranch</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={gitCommitOutline}></IonIcon>
          <div>gitCommit</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={gitCompareOutline}></IonIcon>
          <div>gitCompare</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={gitMergeOutline}></IonIcon>
          <div>gitMerge</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={gitNetworkOutline}></IonIcon>
          <div>gitNetwork</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={gitPullRequestOutline}></IonIcon>
          <div>gitPullRequest</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={glassesOutline}></IonIcon>
          <div>glasses</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={globeOutline}></IonIcon>
          <div>globe</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={golfOutline}></IonIcon>
          <div>golf</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={gridOutline}></IonIcon>
          <div>grid</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={hammerOutline}></IonIcon>
          <div>hammer</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={handLeftOutline}></IonIcon>
          <div>handLeft</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={handRightOutline}></IonIcon>
          <div>handRight</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={happyOutline}></IonIcon>
          <div>happy</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={hardwareChipOutline}></IonIcon>
          <div>hardwareChip</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={headsetOutline}></IonIcon>
          <div>headset</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={heartOutline}></IonIcon>
          <div>heart</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={heartCircleOutline}></IonIcon>
          <div>heartCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={heartDislikeOutline}></IonIcon>
          <div>heartDislike</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={heartDislikeCircleOutline}></IonIcon>
          <div>heartDislikeCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={heartHalfOutline}></IonIcon>
          <div>heartHalf</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={helpOutline}></IonIcon>
          <div>help</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={helpBuoyOutline}></IonIcon>
          <div>helpBuoy</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={helpCircleOutline}></IonIcon>
          <div>helpCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={homeOutline}></IonIcon>
          <div>home</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={hourglassOutline}></IonIcon>
          <div>hourglass</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={iceCreamOutline}></IonIcon>
          <div>iceCream</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={idCardOutline}></IonIcon>
          <div>idCard</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={imageOutline}></IonIcon>
          <div>image</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={imagesOutline}></IonIcon>
          <div>images</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={infiniteOutline}></IonIcon>
          <div>infinite</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={informationOutline}></IonIcon>
          <div>information</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={informationCircleOutline}></IonIcon>
          <div>informationCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={invertModeOutline}></IonIcon>
          <div>invertMode</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={journalOutline}></IonIcon>
          <div>journal</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={keyOutline}></IonIcon>
          <div>key</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={keypadOutline}></IonIcon>
          <div>keypad</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={languageOutline}></IonIcon>
          <div>language</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={laptopOutline}></IonIcon>
          <div>laptop</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={layersOutline}></IonIcon>
          <div>layers</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={leafOutline}></IonIcon>
          <div>leaf</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={libraryOutline}></IonIcon>
          <div>library</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={linkOutline}></IonIcon>
          <div>link</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={listOutline}></IonIcon>
          <div>list</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={listCircleOutline}></IonIcon>
          <div>listCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={locateOutline}></IonIcon>
          <div>locate</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={locationOutline}></IonIcon>
          <div>location</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={lockClosedOutline}></IonIcon>
          <div>lockClosed</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={lockOpenOutline}></IonIcon>
          <div>lockOpen</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={logInOutline}></IonIcon>
          <div>logIn</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={logOut}></IonIcon>
          <div>logOut</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={logoAlipay}></IonIcon>
          <div>logoAlipay</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoAmazon}></IonIcon>
          <div>logoAmazon</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoAmplify}></IonIcon>
          <div>logoAmplify</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoAndroid}></IonIcon>
          <div>logoAndroid</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoAngular}></IonIcon>
          <div>logoAngular</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoApple}></IonIcon>
          <div>logoApple</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoAppleAppstore}></IonIcon>
          <div>logoAppleAppstore</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoAppleAr}></IonIcon>
          <div>logoAppleAr</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoBehance}></IonIcon>
          <div>logoBehance</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoBitbucket}></IonIcon>
          <div>logoBitbucket</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoBitcoin}></IonIcon>
          <div>logoBitcoin</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoBuffer}></IonIcon>
          <div>logoBuffer</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoCapacitor}></IonIcon>
          <div>logoCapacitor</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoChrome}></IonIcon>
          <div>logoChrome</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoClosedCaptioning}></IonIcon>
          <div>logoClosedCaptioning</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoCodepen}></IonIcon>
          <div>logoCodepen</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoCss3}></IonIcon>
          <div>logoCss3</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoDesignernews}></IonIcon>
          <div>logoDesignernews</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoDeviantart}></IonIcon>
          <div>logoDeviantart</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoDiscord}></IonIcon>
          <div>logoDiscord</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoDocker}></IonIcon>
          <div>logoDocker</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoDribbble}></IonIcon>
          <div>logoDribbble</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoDropbox}></IonIcon>
          <div>logoDropbox</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoEdge}></IonIcon>
          <div>logoEdge</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoElectron}></IonIcon>
          <div>logoElectron</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoEuro}></IonIcon>
          <div>logoEuro</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoFacebook}></IonIcon>
          <div>logoFacebook</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoFigma}></IonIcon>
          <div>logoFigma</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoFirebase}></IonIcon>
          <div>logoFirebase</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoFirefox}></IonIcon>
          <div>logoFirefox</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoFlickr}></IonIcon>
          <div>logoFlickr</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoFoursquare}></IonIcon>
          <div>logoFoursquare</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoGithub}></IonIcon>
          <div>logoGithub</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoGitlab}></IonIcon>
          <div>logoGitlab</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoGoogle}></IonIcon>
          <div>logoGoogle</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoGooglePlaystore}></IonIcon>
          <div>logoGooglePlaystore</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoHackernews}></IonIcon>
          <div>logoHackernews</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoHtml5}></IonIcon>
          <div>logoHtml5</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoInstagram}></IonIcon>
          <div>logoInstagram</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoIonic}></IonIcon>
          <div>logoIonic</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoIonitron}></IonIcon>
          <div>logoIonitron</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoJavascript}></IonIcon>
          <div>logoJavascript</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoLaravel}></IonIcon>
          <div>logoLaravel</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoLinkedin}></IonIcon>
          <div>logoLinkedin</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoMarkdown}></IonIcon>
          <div>logoMarkdown</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoMastodon}></IonIcon>
          <div>logoMastodon</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoMedium}></IonIcon>
          <div>logoMedium</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoMicrosoft}></IonIcon>
          <div>logoMicrosoft</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoNoSmoking}></IonIcon>
          <div>logoNoSmoking</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoNodejs}></IonIcon>
          <div>logoNodejs</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoNpm}></IonIcon>
          <div>logoNpm</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoOctocat}></IonIcon>
          <div>logoOctocat</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoPaypal}></IonIcon>
          <div>logoPaypal</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoPinterest}></IonIcon>
          <div>logoPinterest</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoPlaystation}></IonIcon>
          <div>logoPlaystation</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoPwa}></IonIcon>
          <div>logoPwa</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoPython}></IonIcon>
          <div>logoPython</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoReact}></IonIcon>
          <div>logoReact</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoReddit}></IonIcon>
          <div>logoReddit</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoRss}></IonIcon>
          <div>logoRss</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoSass}></IonIcon>
          <div>logoSass</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoSkype}></IonIcon>
          <div>logoSkype</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoSlack}></IonIcon>
          <div>logoSlack</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoSnapchat}></IonIcon>
          <div>logoSnapchat</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoSoundcloud}></IonIcon>
          <div>logoSoundcloud</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoStackoverflow}></IonIcon>
          <div>logoStackoverflow</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoSteam}></IonIcon>
          <div>logoSteam</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoStencil}></IonIcon>
          <div>logoStencil</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoTableau}></IonIcon>
          <div>logoTableau</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoTiktok}></IonIcon>
          <div>logoTiktok</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoTumblr}></IonIcon>
          <div>logoTumblr</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoTux}></IonIcon>
          <div>logoTux</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoTwitch}></IonIcon>
          <div>logoTwitch</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoTwitter}></IonIcon>
          <div>logoTwitter</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoUsd}></IonIcon>
          <div>logoUsd</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoVenmo}></IonIcon>
          <div>logoVenmo</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoVercel}></IonIcon>
          <div>logoVercel</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoVimeo}></IonIcon>
          <div>logoVimeo</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoVk}></IonIcon>
          <div>logoVk</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoVue}></IonIcon>
          <div>logoVue</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoWebComponent}></IonIcon>
          <div>logoWebComponent</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoWechat}></IonIcon>
          <div>logoWechat</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoWhatsapp}></IonIcon>
          <div>logoWhatsapp</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoWindows}></IonIcon>
          <div>logoWindows</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoWordpress}></IonIcon>
          <div>logoWordpress</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoXbox}></IonIcon>
          <div>logoXbox</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoXing}></IonIcon>
          <div>logoXing</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoYahoo}></IonIcon>
          <div>logoYahoo</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoYen}></IonIcon>
          <div>logoYen</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={logoYoutube}></IonIcon>
          <div>logoYoutube</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={magnetOutline}></IonIcon>
          <div>magnet</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={mailOutline}></IonIcon>
          <div>mail</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={mailOpenOutline}></IonIcon>
          <div>mailOpen</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={mailUnreadOutline}></IonIcon>
          <div>mailUnread</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={maleOutline}></IonIcon>
          <div>male</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={maleFemaleOutline}></IonIcon>
          <div>maleFemale</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={manOutline}></IonIcon>
          <div>man</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={mapOutline}></IonIcon>
          <div>map</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={medalOutline}></IonIcon>
          <div>medal</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={medicalOutline}></IonIcon>
          <div>medical</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={medkitOutline}></IonIcon>
          <div>medkit</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={megaphoneOutline}></IonIcon>
          <div>megaphone</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={menuOutline}></IonIcon>
          <div>menu</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={micOutline}></IonIcon>
          <div>mic</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={micCircleOutline}></IonIcon>
          <div>micCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={micOffOutline}></IonIcon>
          <div>micOff</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={micOffCircleOutline}></IonIcon>
          <div>micOffCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={moonOutline}></IonIcon>
          <div>moon</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={moveOutline}></IonIcon>
          <div>move</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={musicalNoteOutline}></IonIcon>
          <div>musicalNote</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={musicalNotesOutline}></IonIcon>
          <div>musicalNotes</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={navigateOutline}></IonIcon>
          <div>navigate</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={navigateCircleOutline}></IonIcon>
          <div>navigateCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={newspaperOutline}></IonIcon>
          <div>newspaper</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={notificationsOutline}></IonIcon>
          <div>notifications</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={notificationsCircleOutline}></IonIcon>
          <div>notificationsCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={notificationsOffOutline}></IonIcon>
          <div>notificationsOff</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={notificationsOffCircleOutline}></IonIcon>
          <div>notificationsOffCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={nuclearOutline}></IonIcon>
          <div>nuclear</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={nutritionOutline}></IonIcon>
          <div>nutrition</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={openOutline}></IonIcon>
          <div>open</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={optionsOutline}></IonIcon>
          <div>options</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={paperPlaneOutline}></IonIcon>
          <div>paperPlane</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={partlySunnyOutline}></IonIcon>
          <div>partlySunny</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={pauseOutline}></IonIcon>
          <div>pause</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={pauseCircleOutline}></IonIcon>
          <div>pauseCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={pawOutline}></IonIcon>
          <div>paw</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={pencilOutline}></IonIcon>
          <div>pencil</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={peopleOutline}></IonIcon>
          <div>people</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={peopleCircleOutline}></IonIcon>
          <div>peopleCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={personOutline}></IonIcon>
          <div>person</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={personAddOutline}></IonIcon>
          <div>personAdd</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={personCircleOutline}></IonIcon>
          <div>personCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={personRemoveOutline}></IonIcon>
          <div>personRemove</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={phoneLandscapeOutline}></IonIcon>
          <div>phoneLandscape</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={phonePortraitOutline}></IonIcon>
          <div>phonePortrait</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={pieChartOutline}></IonIcon>
          <div>pieChart</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={pinOutline}></IonIcon>
          <div>pin</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={pintOutline}></IonIcon>
          <div>pint</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={pizzaOutline}></IonIcon>
          <div>pizza</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={planetOutline}></IonIcon>
          <div>planet</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={playOutline}></IonIcon>
          <div>play</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={playBackOutline}></IonIcon>
          <div>playBack</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={playBackCircleOutline}></IonIcon>
          <div>playBackCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={playCircleOutline}></IonIcon>
          <div>playCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={playForwardOutline}></IonIcon>
          <div>playForward</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={playForwardCircleOutline}></IonIcon>
          <div>playForwardCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={playSkipBackOutline}></IonIcon>
          <div>playSkipBack</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={playSkipBackCircleOutline}></IonIcon>
          <div>playSkipBackCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={playSkipForwardOutline}></IonIcon>
          <div>playSkipForward</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={playSkipForwardCircleOutline}></IonIcon>
          <div>playSkipForwardCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={podiumOutline}></IonIcon>
          <div>podium</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={powerOutline}></IonIcon>
          <div>power</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={pricetagOutline}></IonIcon>
          <div>pricetag</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={pricetagsOutline}></IonIcon>
          <div>pricetags</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={printOutline}></IonIcon>
          <div>print</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={prismOutline}></IonIcon>
          <div>prism</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={pulseOutline}></IonIcon>
          <div>pulse</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={pushOutline}></IonIcon>
          <div>push</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={qrCodeOutline}></IonIcon>
          <div>qrCode</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={radioOutline}></IonIcon>
          <div>radio</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={radioButtonOffOutline}></IonIcon>
          <div>radioButtonOff</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={radioButtonOnOutline}></IonIcon>
          <div>radioButtonOn</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={rainyOutline}></IonIcon>
          <div>rainy</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={readerOutline}></IonIcon>
          <div>reader</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={receiptOutline}></IonIcon>
          <div>receipt</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={recordingOutline}></IonIcon>
          <div>recording</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={refreshOutline}></IonIcon>
          <div>refresh</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={refreshCircleOutline}></IonIcon>
          <div>refreshCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={reloadOutline}></IonIcon>
          <div>reload</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={reloadCircleOutline}></IonIcon>
          <div>reloadCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={removeOutline}></IonIcon>
          <div>remove</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={removeCircleOutline}></IonIcon>
          <div>removeCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={reorderFourOutline}></IonIcon>
          <div>reorderFour</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={reorderThreeOutline}></IonIcon>
          <div>reorderThree</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={reorderTwoOutline}></IonIcon>
          <div>reorderTwo</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={repeatOutline}></IonIcon>
          <div>repeat</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={resizeOutline}></IonIcon>
          <div>resize</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={restaurantOutline}></IonIcon>
          <div>restaurant</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={returnDownBackOutline}></IonIcon>
          <div>returnDownBack</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={returnDownForwardOutline}></IonIcon>
          <div>returnDownForward</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={returnUpBackOutline}></IonIcon>
          <div>returnUpBack</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={returnUpForwardOutline}></IonIcon>
          <div>returnUpForward</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={ribbonOutline}></IonIcon>
          <div>ribbon</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={rocketOutline}></IonIcon>
          <div>rocket</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={roseOutline}></IonIcon>
          <div>rose</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={sadOutline}></IonIcon>
          <div>sad</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={saveOutline}></IonIcon>
          <div>save</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={scaleOutline}></IonIcon>
          <div>scale</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={scanOutline}></IonIcon>
          <div>scan</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={scanCircleOutline}></IonIcon>
          <div>scanCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={schoolOutline}></IonIcon>
          <div>school</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={searchOutline}></IonIcon>
          <div>search</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={searchCircleOutline}></IonIcon>
          <div>searchCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={sendOutline}></IonIcon>
          <div>send</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={serverOutline}></IonIcon>
          <div>server</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={settingsOutline}></IonIcon>
          <div>settings</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={shapesOutline}></IonIcon>
          <div>shapes</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={shareOutline}></IonIcon>
          <div>share</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={shareSocialOutline}></IonIcon>
          <div>shareSocial</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={shieldOutline}></IonIcon>
          <div>shield</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={shieldCheckmarkOutline}></IonIcon>
          <div>shieldCheckmark</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={shieldHalfOutline}></IonIcon>
          <div>shieldHalf</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={shirtOutline}></IonIcon>
          <div>shirt</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={shuffleOutline}></IonIcon>
          <div>shuffle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={skullOutline}></IonIcon>
          <div>skull</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={snowOutline}></IonIcon>
          <div>snow</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={sparklesOutline}></IonIcon>
          <div>sparkles</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={speedometerOutline}></IonIcon>
          <div>speedometer</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={squareOutline}></IonIcon>
          <div>square</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={starOutline}></IonIcon>
          <div>star</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={starHalfOutline}></IonIcon>
          <div>starHalf</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={statsChartOutline}></IonIcon>
          <div>statsChart</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={stopOutline}></IonIcon>
          <div>stop</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={stopCircleOutline}></IonIcon>
          <div>stopCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={stopwatchOutline}></IonIcon>
          <div>stopwatch</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={storefrontOutline}></IonIcon>
          <div>storefront</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={subwayOutline}></IonIcon>
          <div>subway</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={sunnyOutline}></IonIcon>
          <div>sunny</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={swapHorizontalOutline}></IonIcon>
          <div>swapHorizontal</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={swapVerticalOutline}></IonIcon>
          <div>swapVertical</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={syncOutline}></IonIcon>
          <div>sync</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={syncCircleOutline}></IonIcon>
          <div>syncCircle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={tabletLandscapeOutline}></IonIcon>
          <div>tabletLandscape</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={tabletPortraitOutline}></IonIcon>
          <div>tabletPortrait</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={telescopeOutline}></IonIcon>
          <div>telescope</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={tennisballOutline}></IonIcon>
          <div>tennisball</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={terminalOutline}></IonIcon>
          <div>terminal</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={textOutline}></IonIcon>
          <div>text</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={thermometerOutline}></IonIcon>
          <div>thermometer</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={thumbsDownOutline}></IonIcon>
          <div>thumbsDown</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={thumbsUpOutline}></IonIcon>
          <div>thumbsUp</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={thunderstormOutline}></IonIcon>
          <div>thunderstorm</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={ticketOutline}></IonIcon>
          <div>ticket</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={timeOutline}></IonIcon>
          <div>time</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={timerOutline}></IonIcon>
          <div>timer</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={todayOutline}></IonIcon>
          <div>today</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={toggleOutline}></IonIcon>
          <div>toggle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={trailSignOutline}></IonIcon>
          <div>trailSign</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={trainOutline}></IonIcon>
          <div>train</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={transgenderOutline}></IonIcon>
          <div>transgender</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={trashOutline}></IonIcon>
          <div>trash</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={trashBinOutline}></IonIcon>
          <div>trashBin</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={trendingDownOutline}></IonIcon>
          <div>trendingDown</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={trendingUpOutline}></IonIcon>
          <div>trendingUp</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={triangleOutline}></IonIcon>
          <div>triangle</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={trophyOutline}></IonIcon>
          <div>trophy</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={tvOutline}></IonIcon>
          <div>tv</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={umbrellaOutline}></IonIcon>
          <div>umbrella</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={unlinkOutline}></IonIcon>
          <div>unlink</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={videocamOutline}></IonIcon>
          <div>videocam</div>
        </IonItem>
        <IonItem>
          <IonIcon icon={videocamOffOutline}></IonIcon>
          <div>videocamOff</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={volumeHighOutline}></IonIcon>
          <div>volumeHigh</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={volumeLowOutline}></IonIcon>
          <div>volumeLow</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={volumeMediumOutline}></IonIcon>
          <div>volumeMedium</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={volumeMuteOutline}></IonIcon>
          <div>volumeMute</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={volumeOffOutline}></IonIcon>
          <div>volumeOff</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={walkOutline}></IonIcon>
          <div>walk</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={walletOutline}></IonIcon>
          <div>wallet</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={warningOutline}></IonIcon>
          <div>warning</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={watchOutline}></IonIcon>
          <div>watch</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={waterOutline}></IonIcon>
          <div>water</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={wifiOutline}></IonIcon>
          <div>wifi</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={wineOutline}></IonIcon>
          <div>wine</div>
        </IonItem>

        <IonItem>
          <IonIcon icon={womanOutline}></IonIcon>
          <div>woman</div>
        </IonItem>
      </IonList>
    </>
  );
};

export default Write;
