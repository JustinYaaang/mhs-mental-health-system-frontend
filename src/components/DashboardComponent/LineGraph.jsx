import React from 'react'
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import Tasks from 'components/Tasks/Tasks.jsx'
import CustomTabs from 'components/CustomTabs/CustomTabs.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardIcon from 'components/Card/CardIcon.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import swal from 'sweetalert2'
import DateRange from '@material-ui/icons/DateRange'
import LocalOffer from '@material-ui/icons/LocalOffer'
import Update from '@material-ui/icons/Update'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import AccessTime from '@material-ui/icons/AccessTime'
import Accessibility from '@material-ui/icons/Accessibility'
import Grade from '@material-ui/icons/Grade'
import Code from '@material-ui/icons/Code'
import All from '@material-ui/icons/AllInboxOutlined'
import ChartistGraph from 'react-chartist'
class LineGraph extends React.Component {
  constructor(props){
    super(props)
  }


  render () {
    return (
      <GridItem xs={12} sm={12} md={4}>
        <Card chart>
          <CardHeader color={this.props.color}>
            <ChartistGraph
              className='ct-chart'
              data={this.props.dailySubmission}
              type={this.props.type}
              options={this.props.dashboardData.dailySalesChart.options}
              listener={this.props.dashboardData.dailySalesChart.animation}
            />
          </CardHeader>
          <CardBody>
            <h4 className={this.props.classes.cardTitle}>Daily Engagement</h4>
            <p className={this.props.classes.cardCategory}>
              <span className={this.props.classes.successText}>
                <ArrowUpward className={this.props.classes.upArrowCardCategory} />{this.props.dashboardData.percentage}%
              </span>{' '}
                  increase today.
            </p>
          </CardBody>
          <CardFooter chart>
            <div className={this.props.classes.stats}>
              <AccessTime /> updated 4 minutes ago
            </div>
          </CardFooter>
        </Card>
      </GridItem>
    )
  }
}

export default LineGraph
