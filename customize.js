const customizeToggle = document.getElementById('customize-toggle')
const customizePanel = document.getElementById('customize-panel')
const customizeClose = document.getElementById('customize-close')

const banner = document.querySelector('.card-banner')


document.querySelectorAll('.customize-panel input[type="color"]').forEach(picker => {
    picker.addEventListener('input', (e) => {
        const varName = e.target.dataset.var; 
        const newColor = e.target.value;      
        banner.style.setProperty(varName, newColor);
    });
});

customizeToggle.addEventListener('click', () => {
    customizePanel.classList.toggle('open')
})

customizeClose.addEventListener('click', () => {
    customizePanel.classList.remove('open')
})


const presets = {
    sunset: ['#ff6b35', '#f06292', '#8e24aa', '#5e35b1', '#3949ab'],
    ocean:  ['#06b6d4', '#0284c7', '#1d4ed8', '#3730a3', '#581c87'],
    forest: ['#84cc16', '#16a34a', '#059669', '#0d9488', '#0891b2'],
    candy:  ['#f472b6', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6'],
    fire:   ['#fef08a', '#fb923c', '#f97316', '#dc2626', '#991b1b'],
    mono:   ['#1f2937', '#374151', '#4b5563', '#6b7280', '#9ca3af']
}

document.querySelectorAll('.preset').forEach(button => {
    button.addEventListener('click', (e) => {
        const presetName = e.target.dataset.preset
        
        const colors = presets[presetName]
        
        const pickers = document.querySelectorAll('.customize-panel input[type="color"]')
        document.querySelectorAll('.preset').forEach(p => p.classList.remove('active'))
        e.currentTarget.classList.add('active')

        pickers.forEach((picker, index) => {
            const newColor = colors[index]
            const varName = picker.dataset.var
            
            banner.style.setProperty(varName, newColor)
            
            picker.value = newColor
        })
    })
})