import { readFileSync } from 'fs'
import 'dotenv/config'

import { InfluxDB, Point } from '@influxdata/influxdb-client'

const data = JSON.parse(readFileSync('./allure-report/widgets/summary.json', 'utf8'))
const pointStat = new Point('Statistic')
  .intField('failed_tests', data.statistic.failed)
  .intField('broken_tests', data.statistic.broken)
  .intField('skipped_tests', data.statistic.skipped)
  .intField('passed_tests', data.statistic.passed)
  .intField('total_tests', data.statistic.total)
console.log(pointStat)
const pointDuration = new Point('Duration')
  .intField('tests_duration', data.time.duration)
  .intField('test_started_at', data.time.start)
  .intField('test_ended_at', data.time.stop)
  .intField('test_min_duration', data.time.minDuration)
  .intField('test_max_duration', data.time.maxDuration)

const writeApi = new InfluxDB({
  url: process.env.INFLUX_URL,
  token: process.env.INFLUX_TOKEN
}).getWriteApi(process.env.INFLUX_DB, process.env.INFLUX_DB, 'ns')

writeApi.writePoint(pointStat)
writeApi.writePoint(pointDuration)

writeApi
  .close()
  .then(() => {
    console.log('FINISHED')
  })
  .catch(e => {
    console.error(e)
    console.log('\\nFinished ERROR')
  })
