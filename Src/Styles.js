import { StyleSheet} from 'react-native';
const Styles = StyleSheet.create({
    number:{
        fontSize:18,
        fontWeight:'500',
    },
    CategoryCard: {
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowRadius: 2,
        marginHorizontal: 1,
        marginVertical: 6,
        padding:5,
        borderWidth:0.1
      },
      CardContent: {
        marginVertical: 10
      },
      sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
      Container:{
          flex:1
      },
      headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      vehicleImageStyle: {
        justifyContent:'center',
        height: 100,
        width: 100,
        borderRadius: 100 / 2,
      },
      detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      detailsText: {
        paddingTop:10, 
        fontSize:16, 
        fontWeight:'bold'
      },
      detailsTextValue: {
        paddingTop:10,
        fontSize:16,
        textAlign:'center'
      },
      statusBar: {
        height: 28,
      },
})
export default Styles;