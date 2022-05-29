const tags = document.querySelectorAll('#tag-container .tag');

tags.forEach((tag) => {
  tag.addEventListener('click', (e) => {
    if (e.target.parentNode !== tag) return;

    const eventIngredientArrowTag = e.target.children[2];
    const eventIngredientPTag = e.target.children[0];
    const eventIngredientInputTag = e.target.children[1];
    const tagDropdown = tag.children[1];

    tags.forEach((otherTag) => {
      if (otherTag.classList.contains('w-1/2')) {
        const input = otherTag.childNodes[1].childNodes[3];
        const otherTagDropdown = otherTag.childNodes[3];

        otherTag.classList.add('w-44');
        otherTag.classList.remove('w-1/2');
        otherTag.childNodes[1].classList.remove('rounded-t-md');
        otherTag.childNodes[1].classList.add('rounded-md');
        otherTag.childNodes[1].childNodes[5].classList.remove('rotate-180');
        otherTag.childNodes[1].childNodes[1].classList.remove('hidden');
        input.classList.add('hidden');
        input.value = '';
        otherTagDropdown.classList.remove('h-full');
        otherTagDropdown.classList.add('h-0');
      }
    });

    e.target.parentNode.classList.remove('w-44');
    e.target.parentNode.classList.add('w-1/2');
    e.target.classList.add('rounded-t-md');
    e.target.classList.remove('rounded-md');
    eventIngredientInputTag.classList.remove('hidden');
    eventIngredientInputTag.focus();
    eventIngredientArrowTag.classList.add('rotate-180');
    eventIngredientPTag.classList.add('hidden');
    tagDropdown.classList.add('h-full');
    tagDropdown.classList.remove('h-0');
  });
});
