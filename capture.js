const downloadBtn = document.querySelector('.download-btn')
const link = document.querySelector('.download-capture')

downloadBtn.addEventListener('click', () => {
    html2canvas(document.querySelector('.global-card'), { useCORS: true }).then(canvas => {
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95)
        link.href = dataUrl
        link.download = 'github-stats.jpg'
        link.click()
    })
})
