<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  mounted () {
    this.renderChart({
      labels: ['Donald Dak', 'Mikki Mouse', 'Pistol Pete'],
      datasets: [
        {
            backgroundColor: [
            '#41B883',
            '#E46651',
            '#00D8FF'
            ],
          data: [45, 27.5, 27.5]
        }
      ]
    }, {
      responsive: true, 
      maintainAspectRatio: false,
      pieceLabel: {
        mode: 'percentage',
        precision: 1
      }
    })
 }
}
</script>