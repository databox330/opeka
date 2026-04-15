const accordionContent = document.querySelectorAll(".accordionContent");
const accordionTitle = document.querySelectorAll(".accordionTitle");


accordionContent.forEach((accordionTitle) => {
	accordionTitle.addEventListener("click", () => {
		if (accordionContent.classList.contains("is-open")) {
			accordionContent.classList.remove("is-open");
            console.log("11111111111111111");
		} else {
            console.log("22222222222222222");
			const accordionTitlesWithIsOpen = document.querySelectorAll(".is-open");
			accordionTitlesWithIsOpen.forEach((accordionTitleWithIsOpen) => {
				accordionTitleWithIsOpen.classList.remove("is-open");
			});
			accordionContent.classList.add("is-open");
		}
	});
});