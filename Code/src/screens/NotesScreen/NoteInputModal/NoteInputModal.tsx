import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  BackHandler,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { noteInputModalStyles } from "./NoteInputModalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import CommonStyle from "../../../styles/Global";
import ShowImageFullScreen from "../ShowImageFullScreen/ShowImageFullScreen";
import { svgImports } from "../../../data/Imports";
import useColorScheme from "../../../hooks/useColorScheme";
import Header from "../../../shared/Header";

const NoteInputModal = ({ isEdit, note, visible, onSubmit, onClose }: any) => {
  const colorScheme = useColorScheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrlArray, setImageUrlArray] = useState<string[]>([]);
  const [selectedImg, setSelectedImage] = useState<string>();
  const [showImgInFullScreen, setShowImgFullScreen] = useState(false);
  let theme = colorScheme === "dark";

  useEffect(() => {
    if (isEdit === true) {
      setTitle(note.title);
      setDescription(note.desc);
      setImageUrlArray(note.image);
    } else {
      setTitle("");
      setDescription("");
      setImageUrlArray([]);
    }
  }, [isEdit]);

  const handleModalClose = () => {
    Keyboard.dismiss();
  };
  const showImgFullScreen = (image: string) => {
    setSelectedImage(image);
    setShowImgFullScreen(true);
  };
  const updateUrls = (value: string) => {
    setImageUrlArray([...imageUrlArray, value]);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      updateUrls(result.assets[0].uri);
    }
  };

  const deleteImg = async (img: string) => {
    let updatedUrl = imageUrlArray.filter((image: string) => {
      if (image !== img) {
        return image;
      }
    });
    await setImageUrlArray([...updatedUrl]);
  };
  const removeUrl = (data: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this image ?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteImg(data);
          },
        },
        { text: "No" },
      ]
    );
  };
  const alert = () => {
    Alert.alert(
      "Can't create Empty Note",
      "Are you sure you want to discard this Empty note ?",
      [
        {
          text: "Yes",
          onPress: () => {
            if (isEdit == true) {
              onSubmit(
                title.trim(),
                description.trim(),
                Date.now(),
                note.id,
                imageUrlArray
              );
            }
            setImageUrlArray([]);
            onClose();
          },
        },
        { text: "No" },
      ]
    );
  };
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      updateUrls(result.assets[0].uri);
    }
  };
  const handleOnChangeText = (text: string, valueFor: string) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDescription(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !description.trim() && imageUrlArray.length == 0)
      return alert();

    if (isEdit === true) {
      onSubmit(
        title.trim(),
        description.trim(),
        Date.now(),
        note.id,
        imageUrlArray
      );
    } else {
      onSubmit(title.trim(), description.trim(), imageUrlArray);
      let arr: Array<string> = [];
      setTitle("");
      setDescription("");
      setImageUrlArray([...arr]);
    }
    onClose();
  };
  useEffect(() => {
    const backbuttonHander = () => {
      setTitle("");
      setDescription("");
      mvToPrvPage();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  const mvToPrvPage = () => {
    let arr: Array<string> = [];
    setTitle("");
    setDescription("");
    setImageUrlArray([...arr]);
    onClose();
  };
  return (
    <KeyboardAvoidingView style={CommonStyle.flex1}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <Modal
            visible={visible}
            animationType="fade"
            onRequestClose={() => onClose()}
          >
            <View
              style={[
                noteInputModalStyles.container,
                theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
              ]}
            >
              <View style={[CommonStyle.flexDRow, noteInputModalStyles.headerView]}>
                <View style={[CommonStyle.flexDRow, noteInputModalStyles.header]}>
                  <Header
                    title="Add Your Note"
                    type="Notes"
                    NotesBackButton={mvToPrvPage}
                  />
                </View>
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyle.montserratBold,
                    CommonStyle.c_000000,
                    CommonStyle.as_center,
                    CommonStyle.ta_center,
                    CommonStyle.fs_17,
                    theme ? CommonStyle.c_D1D0D0 : CommonStyle.c_000000,
                  ]}
                  onPress={handleSubmit}
                >
                  Save
                </Text>
              </View>

              <TextInput
                autoFocus={true}
                allowFontScaling={false}
                value={title}
                onChangeText={(text) => handleOnChangeText(text, "title")}
                maxLength={100}
                placeholder="Title"
                placeholderTextColor={theme ? "#D1D0D0" : "grey"}
                style={[
                  CommonStyle.montserratBold,
                  CommonStyle.fs_20,
                  CommonStyle.c_000000,
                  noteInputModalStyles.input,
                  noteInputModalStyles.title,
                  theme ? CommonStyle.c_D1D0D0 : CommonStyle.c_000000,
                ]}
              />
              <View style={[noteInputModalStyles.input, noteInputModalStyles.desc]}>
                <ScrollView contentContainerStyle={noteInputModalStyles.noteContainer}>
                  <TextInput
                    allowFontScaling={false}
                    value={description}
                    multiline
                    placeholder="Type here"
                    placeholderTextColor={theme ? "#D1D0D0" : "grey"}
                    onChangeText={(text) => handleOnChangeText(text, "desc")}
                    style={[
                      theme ? CommonStyle.c_D1D0D0 : CommonStyle.c_000000,
                    ]}
                  />
                  <ShowImageFullScreen
                    onClose={() => {
                      setShowImgFullScreen(false);
                    }}
                    visible={showImgInFullScreen}
                    uri={selectedImg}
                  />
                  {imageUrlArray.length > 0 ? (
                    <>
                      {imageUrlArray.map((imageUrl: string) => (
                        <View
                          style={noteInputModalStyles.imgContainer}
                          key={imageUrl.toString()}
                        >
                          <TouchableOpacity
                            key={imageUrl}
                            onPress={() => {
                              showImgFullScreen(imageUrl);
                            }}
                            onLongPress={() => {
                              removeUrl(imageUrl);
                            }}
                          >
                            <Image
                              source={{ uri: imageUrl }}
                              style={noteInputModalStyles.imgAttached}
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </ScrollView>
              </View>
              <View
                style={[
                  CommonStyle.w100,
                  CommonStyle.flexDRow,
                  CommonStyle.ai_center,
                  CommonStyle.pAbsolute,
                  CommonStyle.as_center,
                  CommonStyle.jc_spaceBTW,
                  CommonStyle.dflex,
                  noteInputModalStyles.icon,
                ]}
              >
                <View style={noteInputModalStyles.importImgContr}>
                  <View
                    style={[
                      CommonStyle.dflex,
                      CommonStyle.as_center,
                      CommonStyle.flexDRow,
                      CommonStyle.ai_center,
                      CommonStyle.jc_spaceEven,
                      CommonStyle.bg_007AFF,
                      noteInputModalStyles.imgButton,
                    ]}
                  >
                    <TouchableOpacity
                      onPress={pickImage}
                      style={[
                        CommonStyle.dflex,
                        CommonStyle.ai_center,
                        noteInputModalStyles.btnCntr,
                      ]}
                    >
                      <svgImports.GalleryIcon size={22} />
                    </TouchableOpacity>
                    <svgImports.Line height={25} width={2} color={"white"} />
                    <TouchableOpacity
                      onPress={openCamera}
                      style={[
                        CommonStyle.dflex,
                        CommonStyle.ai_center,
                        noteInputModalStyles.btnCntr,
                      ]}
                    >
                      <svgImports.CameraIcon size={22} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <TouchableWithoutFeedback onPress={handleModalClose}>
              <View
                style={[
                  CommonStyle.flex1,
                  noteInputModalStyles.modalBG,
                  StyleSheet.absoluteFillObject,
                  theme ? CommonStyle.bg_2E343C : CommonStyle.bg_FFFFFF,
                ]}
              />
            </TouchableWithoutFeedback>
          </Modal>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NoteInputModal;