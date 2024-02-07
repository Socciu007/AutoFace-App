let countUploadImg = 0;
const uploadImgResult = await uploadImg(page, CreatePost);
const checkImg = await getElements(page, '[class="img cover"][data-client-image="true"]');
if (uploadImgResult && checkImg != null) {
  logger('Upload image successful');
} else {
  logger("Can't upload image");
  countUploadImg++;
  if(countUploadImg >= 3) return 0;
  continue;
}