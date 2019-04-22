import { connect } from 'react-redux';
import RouteList from '../components/RouteList';

const mapStateToProps = state => ({
  routes: state.routes
})

export default connect(
  mapStateToProps,
)(RouteList)