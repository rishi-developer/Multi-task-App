import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Image,
  Platform,
  BackHandler,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ActivityIndicator,
  KeyboardEvent,
} from "react-native";
import { notesScreenStyles } from "./NotesScreenStyles";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import CommonModal from "../../../shared/CommonModal";
import CommonStyle from "../../../styles/Global";
import Note from "../Note/Note";
import NoteInputModal from "../NoteInputModal/NoteInputModal";
import SearchBar from "../../../shared/SearchBar";
import { Text, View } from "../../../shared/Themed";
import useColorScheme from "../../../hooks/useColorScheme";
import Header from "../../../shared/Header";
import { NoteType } from "../../../../types";

const NotesScreen = ({ navigation }: any) => {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [constNotes, setConstNotes] = useState<NoteType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultNotFound, setResultNotFound] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [filteredQuery, setFilteredQuery] = useState<NoteType[]>([]);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [note, setNote] = useState<NoteType>();
  const [selectedItems, setSelectedItems] = useState<Number[]>([]);
  const [isselected, setisselected] = useState(false);
  const [showWarning, SetshowWarning] = useState(false);
  const [transparentLoader, setTransparentLoader] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const theme = colorScheme === "dark";
  useEffect(() => {
    const backbuttonHander = () => {
      navigation.navigate("Home");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  useEffect(() => {
    findNotes();
    if (selectedItems.length === 0) setisselected(false);
    setSearchQuery("");
  }, [isEdit]);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedItems([]);
      setisselected(false);
    }, [])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleOnClear();
    });
  }, [navigation]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardHide
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onKeyboardShow = (event: KeyboardEvent) => {
    setKeyboardOpen(true);
  };

  const onKeyboardHide = () => {
    setKeyboardOpen(false);
  };

  const findNotes = async () => {
    const result = await SecureStore.getItemAsync("notes");
    if (result !== null) setNotes(JSON.parse(result));
    if (result !== null) setConstNotes(JSON.parse(result));
  };

  const handleOnSubmit = async (
    title: string,
    desc: string,
    image: Array<string>
  ) => {
    const note = { id: Date.now(), title, desc, time: Date.now(), image };
    const updatedNotes: NoteType[] = [...notes, note];
    setNotes(updatedNotes);
    setConstNotes(updatedNotes);
    await SecureStore.setItemAsync("notes", JSON.stringify(updatedNotes));
  };

  const openNote = (note: NoteType) => {
    if (selectedItems.length) {
      return handleOnLongPress(note);
    }
    setNote(note);
    setIsEdit(true);
    setModalVisible(true);
  };

  const handleUpdate = async (
    title: string,
    desc: string,
    time: Number,
    id: Number,
    image: Array<string>
  ) => {
    if (title.length == 0 && desc.length == 0 && image.length == 0) {
      handleDelete(id);
    } else {
      const newNotes = notes.filter((note: NoteType) => {
        if (note.id === id) {
          note.title = title;
          note.desc = desc;
          note.image = image;
          note.time = time;
        }
        return note;
      });
      setNotes([...newNotes]);
      setConstNotes([...newNotes]);
      await SecureStore.setItemAsync("notes", JSON.stringify([...newNotes]));
      setIsEdit(false);
      handleOnClear();
    }
  };
  const handleOnSearchInput = async (text: string) => {
    setResultNotFound(false);
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = constNotes.filter((note: NoteType) => {
      if (
        note.title.toLowerCase().includes(text.toLowerCase()) ||
        note.desc.toLowerCase().includes(text.toLowerCase())
      )
        return note;
    });
    const filtered = constNotes.filter((note: NoteType) => {
      if (
        !(
          note.title.toLowerCase().includes(text.toLowerCase()) ||
          note.desc.toLowerCase().includes(text.toLowerCase())
        )
      )
        return note;
    });
    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
      setisselected(false);
      await setFilteredQuery([...filtered]);
    } else {
      setResultNotFound(true);
      setisselected(false);
    }
  };
  const handleOnClear = async () => {
    setFilteredQuery([]);
    setSearchQuery("");
    setResultNotFound(false);
    selectedItems.length === 0 ? setisselected(false) : setisselected(true);
    await findNotes();
  };
  const handleDelete = async (id: Number) => {
    let newNotes = notes.filter((notes: NoteType) => {
      if (notes.id !== id) return notes;
    });
    if (searchQuery.length > 0) {
      newNotes = [...newNotes, ...filteredQuery];
      await setNotes(newNotes);
      setConstNotes(newNotes);
      await SecureStore.setItemAsync("notes", JSON.stringify(newNotes));
      handleOnClear();
    } else {
      setNotes([...newNotes]);
      setConstNotes([...newNotes]);
      await SecureStore.setItemAsync("notes", JSON.stringify(newNotes));
    }
  };
  const openInputModal = async () => {
    setIsEdit(false);
    setModalVisible(true);
  };
  const onClose = async () => {
    handleOnClear();
    setIsEdit(false);
    setModalVisible(false);
  };
  const handleOnLongPress = (note: NoteType) => {
    setisselected(true);
    if (selectedItems.includes(note.id as never)) {
      const newListItem = selectedItems.filter((noteId) => noteId !== note.id);
      newListItem.length === 0 ? setisselected(false) : "";
      return setSelectedItems(newListItem);
    }
    setSelectedItems([...selectedItems, note.id as never]);
  };
  const getSelected = (note: NoteType) =>
    selectedItems.includes(note.id as never);

  const deselectItems = () => {
    setisselected(false);
    setSelectedItems([]);
  };

  const handleOutsidePress = () => {
    Keyboard.dismiss();
  };

  const deleteMultipleNotes = async () => {
    if (!selectedItems.length) return;
    const newNotes = notes.filter(
      (notes: NoteType) => !selectedItems.includes(notes.id)
    );
    if (searchQuery.length == 0) {
      setNotes(newNotes);
      await SecureStore.setItemAsync("notes", JSON.stringify([...newNotes]));
    } else {
      setNotes([...newNotes, ...filteredQuery]);
      await SecureStore.setItemAsync(
        "notes",
        JSON.stringify([...newNotes, ...filteredQuery])
      );
      handleOnClear();
    }
    deselectItems();
    SetshowWarning(false);
  };

  const alert = () => {
    SetshowWarning(true);
  };
  const showWarningfalse = () => {
    SetshowWarning(false);
    deselectItems();
  };
  const selectall = async () => {
    const newnotes = notes.filter((notes: NoteType) =>
      selectedItems.push(notes.id as never)
    );
    setNotes(newnotes);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View
          style={[
            CommonStyle.dflex,
            notesScreenStyles.container,
            theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
          ]}
        >
          <Header title="Notes" type="BottomTab" />
          {notes.length ? (
            <>
              {!isselected ? (
                <SearchBar
                  value={searchQuery}
                  onChangeText={handleOnSearchInput}
                  placeholder="Find your notes"
                  onClear={handleOnClear}
                  openInputModal={openInputModal}
                  typeOf="normal"
                />
              ) : (
                <SearchBar
                  value={searchQuery}
                  onChangeText={handleOnSearchInput}
                  placeholder="Find your notes"
                  onClear={handleOnClear}
                  openInputModal={null}
                  typeOf="normal"
                />
              )}
            </>
          ) : (
            <View
              style={[
                CommonStyle.w100,
                notesScreenStyles.mainContainer,
                theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
              ]}
            ></View>
          )}
          {resultNotFound ? (
            <View
              style={[
                CommonStyle.dflex,
                CommonStyle.jc_center,
                CommonStyle.ai_center,
                notesScreenStyles.resultNotFound,
                theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserrat,
                  CommonStyle.fs_20,
                  notesScreenStyles.noResultFoundText,
                  theme ? CommonStyle.c_D1D0D0 : CommonStyle.c_747B84,
                ]}
              >
                No results found
              </Text>
            </View>
          ) : (
            <>
              {notes.length == 0 ? (
                <>
                  <View
                    style={[
                      CommonStyle.dflex,
                      CommonStyle.ai_center,
                      CommonStyle.jc_center,
                      CommonStyle.ac_center,
                      notesScreenStyles.noteContainer,
                      theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        openInputModal();
                      }}
                      style={[
                        CommonStyle.pAbsolute,
                        notesScreenStyles.noteCard,
                        theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
                      ]}
                    >
                      <Image
                        source={require("../../../../assets/images/Mainnotes.png")}
                        style={notesScreenStyles.noteImage}
                      ></Image>
                    </TouchableOpacity>
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserrat,
                        CommonStyle.fs_20,
                        theme ? CommonStyle.c_D1D0D0 : CommonStyle.c_747B84,
                      ]}
                    >
                      Add your Notes here!
                    </Text>
                  </View>
                </>
              ) : (
                <View
                  style={[
                    notesScreenStyles.scrollviewConatiner,
                    theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
                  ]}
                >
                  {transparentLoader && Platform.OS == "android" && (
                    <ActivityIndicator color={"#666592"} size={"large"} />
                  )}
                  <FlatList
                    data={notes}
                    renderItem={({ item, index }) => {
                      return (
                        <Note
                          key={item.id}
                          index={[index, notes.length - 1]}
                          onLongPress={() => handleOnLongPress(item)}
                          onPress={() => openNote(item)}
                          item={item}
                          navigation={navigation}
                          handleDelete={handleDelete}
                          selected={getSelected(item)}
                        />
                      );
                    }}
                  />
                </View>
              )}
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
      {isselected && showWarning == false && !keyboardOpen && (
        <View
          style={[
            CommonStyle.w100,
            CommonStyle.flexDRow,
            CommonStyle.jc_spaceAround,
            CommonStyle.pAbsolute,
            notesScreenStyles.icon,
            {
              backgroundColor: "transparent",
            },
          ]}
        >
          <TouchableOpacity
            onPress={selectall}
            style={[
              CommonStyle.ai_center,
              CommonStyle.jc_center,
              CommonStyle.as_FStart,
              CommonStyle.bg_498BEA,
              notesScreenStyles.btnContainer,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratBold,
                CommonStyle.ta_center,
                CommonStyle.c_FFFFFF,
                CommonStyle.jc_center,
                CommonStyle.bg_498BEA,
                notesScreenStyles.selectBtn,
              ]}
              onPress={selectall}
            >
              Select all
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert()}
            style={[
              CommonStyle.ai_center,
              CommonStyle.jc_center,
              CommonStyle.as_FStart,
              CommonStyle.bg_E83A50,
              notesScreenStyles.btnContainer,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratBold,
                CommonStyle.ta_center,
                CommonStyle.c_FFFFFF,
                CommonStyle.jc_center,
                notesScreenStyles.selectBtn,
              ]}
              onPress={() => alert()}
            >
              Delete all
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {isEdit ? (
        <>
          <NoteInputModal
            note={note}
            isEdit={true}
            visible={modalVisible}
            onClose={onClose}
            onSubmit={handleUpdate}
          />
        </>
      ) : (
        <>
          <NoteInputModal
            isEdit={false}
            visible={modalVisible}
            onClose={onClose}
            onSubmit={handleOnSubmit}
          />
        </>
      )}
      {showWarning && (
        <View
          style={[
            CommonStyle.flex1,
            CommonStyle.bg_FFFFFF,
            CommonStyle.ai_center,
          ]}
        >
          <CommonModal
            showWarning={showWarning}
            showWarningfalse={showWarningfalse}
            typeOf="delete"
            selectedItems={selectedItems}
            logoutButtonHandler={deleteMultipleNotes}
            message="Confirm Delete"
            value="notes"
          />
        </View>
      )}
    </>
  );
};


export default NotesScreen;
