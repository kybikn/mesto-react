/** Функция обогащания данных карточки информацией
 * о лайке (like=true|false)
 * и является ли пользователь владельцем карточки (isOwner=true|false) */
export default function enrichCardData(cardData, userId) {
  // делаем глубокую копию объекта карточки, чтобы не менять изначальный объект
  const enrichedCardData = JSON.parse(JSON.stringify(cardData));
  // обогащение свойством isOwner
  // если id пользователя совпадает с id владельца  карточки, то пользователь является владельцем этой карточки
  if (userId === enrichedCardData.owner._id) {
    enrichedCardData.isOwner = true;
    // если не совпадает, то не является владельцем
  } else enrichedCardData.isOwner = false;
  // обогащение свойством like
  // проходим по массиву всех лайков одной карточки и если id пользователя совпадает с id хоть одного пользователя поставившего лайк,
  if (enrichedCardData.likes.some((liker) => liker._id === userId)) {
    // то пользователь поставил лайк
    enrichedCardData.like = true;
    // если нет, то не поставил
  } else enrichedCardData.like = false;
  // возвращаем обогащенную карточку
  return enrichedCardData;
}
