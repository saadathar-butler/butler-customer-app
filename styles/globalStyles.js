import { StyleSheet } from "react-native"

export const globalStyle = StyleSheet.create({

    screenContainer: {
        flex: 1,
        padding: 10,
        position: 'relative',
        backgroundColor: 'white',
    },
    textcolorLight: {
        color: '#A199AC'
    },
    LoginTopDiv: {
        height: 90,
        width: 90,
        backgroundColor: '#592D8E',
        borderRadius: 50,
        marginLeft: -55,
        marginVertical: '8%'
    },
    LoginTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0E0021',
    },
    LoginOptionsRow: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 15
    },
    LoginOptionsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0E0021'
    },
    InputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAF8FF',
        borderRadius: 12,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginVertical: 15
    },
    InputIcon: {
        marginRight: 10,
        color:'#A199AC'
    },
    TheamTextColor: {
        color: '#592D8E',
    },
    TheamTextbtn: {
        fontWeight: '700',
        fontSize: 14,
        color: '#592D8E',
    },
    ForgotPassRow: {
        marginTop:'15%',
        width: '100%',
        alignItems: 'center'
    },
    Theambtn: {
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 15,
        marginVertical: 15,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#592D8E',
        shadowColor: '#572D8E',
        shadowRadius: 12,
        shadowOffset: {
            width: 12,
            height: 12,
        },
        elevation: 20,
    },
    TheambtnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600'
    },
    codeDescp: {
        fontSize: 16,
        marginVertical: 5,
        color: '#A199AC',
    },
    OTPInputView: {
        width: '100%',
        height: 80,
        paddingHorizontal: 20
    },
    OTPCellView: {
        width: 50,
        height: 50,
        borderWidth: 0,
        backgroundColor: '#FAF8FF',
        borderRadius: 10,
        color: 'black',
        fontWeight: '900',
        fontSize: 18
    },

    OTPCellHighlightedView: {
        borderColor: "#592D8E",
        borderWidth: 3
    },
    mb16: {
        marginBottom: 16
    },
    w100: {
        width: '100%',
    },
    userProfile: {
        width: 90,
        height: 90,
        borderWidth: 3,
        borderColor: "#DCDCDC",
        padding: 5,
        borderRadius: 25,
        marginBottom: 20,
        position: 'relative'
    },
    imageFit: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    imageContain: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    editIcon: {
        color: "white",
        backgroundColor: '#592D8E',
        position: 'absolute',
        padding: 5,
        borderRadius: 100 / 2,
        right: -5,
        bottom: -5,
        width: 30,
        height: 30,
        padding: 8,
    },
    userProfileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    ModalView: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    modalBody: {
        padding: 15,
        alignItems: 'center',
    },
    ModalImageView: {
        width: 200,
        height: 100,
        marginVertical: 15
    },
    modalFooter: {
        borderTopWidth: 1,
        borderColor: '#A199AC',
        width: '100%',
        height: 45,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pageHeader: {
        height: 100,
        position: 'relative',
        marginVertical: 15,
    },
    HeaderRightDiv: {
        height: 70,
        width: 70,
        borderRadius: 100 / 2,
        backgroundColor: '#592D8E',
        position: 'absolute',
        right: '-10%',
    },
    HeaderLeftDiv: {
        height: 80,
        width: 80,
        borderRadius: 100 / 2,
        backgroundColor: '#E5E3E9',
        position: 'absolute',
        left: '-10%',
        bottom: 0
    },
    welcomeText: {
        color: '#A199AC',
        fontSize: 20
    },
    welcomeUserTitle: {
        color: '#0E0021',
        fontSize: 25,
        fontWeight: 'bold'
    },
    welcomeNoteContainer: {
        paddingHorizontal: 10,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        paddingVertical: 10,
    },
    screenBody: {
        paddingHorizontal: 15,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    recentBookings:{
        fontSize:15,
        fontWeight:'bold'
    },
    activeTab:{
        borderBottomWidth:3,
        borderColor:'#FEED06',
    },
    tabTextstyle:{
        fontSize:18,
    },
    activetabText:{
        color:'#592D8E',
        fontWeight:'700'
    },
    inactivetabText:{
        color:'#A199AC',
        fontWeight:'400'
    },
    categoryCard:{
        marginHorizontal:5,
        backgroundColor: '#FFF',
        alignItems:'center',
        padding:10,
        height: 150,
        width: '47%',
        borderRadius: 12,
        marginVertical: 10,
        shadowColor: "#0E0021",
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
    },
    categoryImgContainer:{
        width:60,
        height:60,
        borderRadius:100/2,
        backgroundColor:'#E5E3E9',
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
    categoryImgStyle:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
    categoryTitle:{
        color:'#0E0021',
        fontSize:16,
        fontWeight:'800',
        marginVertical:7
    },
    serviceTitle:{
        fontSize:25,
        color:'#0E0021',
        fontWeight:'800'
    },
    subcategoriesCard:{
        margin:5,
        padding: 15,
        borderColor:"#DCDCDC",
        borderRadius:10,
        display:'flex',
        flexDirection:'row',
        backgroundColor:"#FFFF",
        alignItems:'center',
        marginBottom:10
    },
    shadow: {
        shadowColor: '#0E0021',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation:3
      },
      subCategoryInfo:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    subCategoryTitle:{
        fontSize:16,
        fontWeight:'600',
        width:'65%',
        color:'#0E0021'
    },
    costContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        width:'35%'
    },
    fontDark:{
        color:'#0E0021'
    },
    Card:{
        borderRadius: 10,
        padding:10,
        margin:5,
        backgroundColor:'#fff'
    },
    cardTitle:{
        color:'#0E0021',
        fontSize:18,
        fontWeight:'bold',
        marginBottom:10
    },
    ImageContainer:{
        width:85,
        height:85,
        borderWidth:1,
        borderStyle: 'dashed',
        borderColor:'#E5E3E9',
        borderRadius:12,
        alignItems:'center',
        justifyContent:'center',
    },
    imageBtnStyle:{
        height:50,
        width:50
    },
    textarea: {
        height: 100,
        textAlignVertical: 'top',
        justifyContent: "flex-start",
        color: '#000'
    },
    profileCardContainer:{
        padding:5,
        borderRadius:18,
        backgroundColor:'#DCDCDC',
        marginTop: '-25%',
    },
    editProfilebtn:{
        flexDirection:'row',
        marginVertical: 5,
    },
    termsRow:{
        flexDirection:'row',
        marginBottom:5,
        paddingHorizontal: 10,
        width:'95%',
    },
    settingCustomButton:{
        marginVertical:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal: 15,
        borderRadius:12,
        padding:15,
        backgroundColor:'#fff'
    },
    CustomButtonText:{
        color:'#0E0021',
        fontSize:18,
        fontWeight:'bold'
    },
    bookingCard:{
        padding: 20,
        backgroundColor:'#fff',
        borderRadius:12,
        flexDirection:'row',
        justifyContent:'space-between',
        margin:5
    },
    bookingCardTitle:{
        fontSize:17,
        fontWeight:'900',
        color:'#0E0021',
    },
    BookingInfo:{
        flexDirection:'row',
        width:'75%'
    },
    BookingStatus:{
        borderRadius:32,
        alignSelf:'center',
        paddingVertical:5,
        paddingHorizontal:10,
        marginVertical:20,
        fontWeight:'700',
    },

    Active:{
        backgroundColor:'#1E72FF',
        color:'#fff'
    },
    Pending:{
        backgroundColor:'#FFFCCD',
        color:'#FEED06'
    },
    Completed:{
        backgroundColor:'#D3FBCC',
        color:'#25E900'
    },
    Cancled:{
        backgroundColor:'#FDDBDB',
        color:'#F34B4B'
    },
    textcolorDark:{
        color:'#0E0021'
    },
    invoiceHeader:{
        flexDirection:'row',
       alignItems:'center',
        width:'100%',
        paddingHorizontal: 10,
    },
    invoiceHeaderTitle:{
       justifyContent:'center',
       alignItems:'center',
       width:'100%'
    },
    invoiceLogoContainer:{
        width:'25%',
        marginVertical:15,
       height:70
    },
    invoiceLogoImage:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
    invoiceListItem:{
        marginVertical:10,
        paddingHorizontal:10,
        borderBottomWidth:1,
        borderBottomColor:'#DCDCDC',
        alignItems:'baseline',
        flex: 2,
    },
    invoiceItemTitle:{
        width:'70%'
    },
    userinfoContainer:{
        borderBottomWidth:1,
        borderColor:"#DCDCDC",
        paddingVertical: 5,
    },
    userInfoDes:{
        width:'100%'
    },
    userInfoDesRow:{
        flexDirection:'row',
        paddingHorizontal: 10,
        justifyContent:'space-between'
    },
    invoiceSubHeading:{
        textAlign:'center',
        fontSize:20,
        borderBottomWidth:1,
        borderColor:"#DCDCDC", 
        color:'#000'
    },
    costDetailsText:
    {
        color: 'black',
        fontSize: 17,
    },
    costDetailsContainer: {
        flex: 1,
        borderTopWidth: 1,
        borderColor: '#DCDCDC',
        paddingHorizontal: 6,
        paddingVertical: 6,
        width:'100%',
        height:100,
        backgroundColor:'white',
        position:'absolute',
        bottom:0
    },
    resendcodeinfo:{
        fontSize:14,
        textAlign:'center',
        color:'black'
    }
})