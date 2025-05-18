"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Switch,
  Select,
  SelectItem,
  Tooltip,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
  Badge,
  DatePicker,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Spinner,
} from "@heroui/react";
import { Icon } from "@iconify/react";

const themes = [
  {
    name: "Default",
    colors: {
      primary: "blue",
      accent: "indigo",
      background: "white",
    },
  },
  {
    name: "Dark",
    colors: {
      primary: "purple",
      accent: "pink",
      background: "gray-900",
    },
  },
  {
    name: "Vibrant",
    colors: {
      primary: "green",
      accent: "emerald",
      background: "white",
    },
  },
  {
    name: "Minimalist",
    colors: {
      primary: "neutral",
      accent: "zinc",
      background: "gray-50",
    },
  },
];

const formElements = [
  {
    type: "text",
    icon: "solar:text-linear",
    label: "Text Input",
    defaultProps: {
      placeholder: "Enter text...",
      required: false,
      label: "Text Input",
      helpText: "",
    },
  },
  {
    type: "textarea",
    icon: "solar:document-text-linear",
    label: "Text Area",
    defaultProps: {
      placeholder: "Enter long text...",
      required: false,
      label: "Text Area",
      helpText: "",
      rows: 4,
    },
  },
  {
    type: "select",
    icon: "solar:double-alt-arrow-down-outline",
    label: "Dropdown",
    defaultProps: {
      required: false,
      label: "Select an option",
      helpText: "",
      options: ["Option 1", "Option 2", "Option 3"],
    },
  },
  {
    type: "checkbox",
    icon: "solar:box-linear",
    label: "Checkboxes",
    defaultProps: {
      required: false,
      label: "Select multiple options",
      helpText: "",
      options: ["Option 1", "Option 2", "Option 3"],
    },
  },
  {
    type: "radio",
    icon: "solar:minimalistic-magnifer-linear",
    label: "Radio Buttons",
    defaultProps: {
      required: false,
      label: "Select one option",
      helpText: "",
      options: ["Option 1", "Option 2", "Option 3"],
    },
  },
  {
    type: "date",
    icon: "solar:calendar-date-linear",
    label: "Date Picker",
    defaultProps: {
      required: false,
      label: "Select a date",
      helpText: "",
    },
  },
  {
    type: "file",
    icon: "solar:cloud-upload-linear",
    label: "File Upload",
    defaultProps: {
      required: false,
      label: "Upload a file",
      helpText: "",
      accept: "*/*",
      maxSize: "5MB",
    },
  },
  {
    type: "rating",
    icon: "solar:star-linear",
    label: "Rating",
    defaultProps: {
      required: false,
      label: "Rate this",
      helpText: "",
      maxRating: 5,
    },
  },
];

export default function CreateFormPage() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState("Default");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [elements, setElements] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [formStatus, setFormStatus] = useState("draft");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("properties");
  const [formSettings, setFormSettings] = useState({
    allowMultipleSubmissions: true,
    requireEmailVerification: false,
    responsesClosed: false,
    allowDuplicateSubmissions: false,
    notifyOnSubmission: true,
  });
  const [headerImage, setHeaderImage] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewPage, setPreviewPage] = useState(0);
  const [previewAnswers, setPreviewAnswers] = useState({});
  const [previewSubmitted, setPreviewSubmitted] = useState(false);
  const [isTitleMissingModalOpen, setIsTitleMissingModalOpen] = useState(false);
  const dummyLink = `https://ezzyforms.app/form/12345`;

  const handleDragStart = (e, element, isFromToolbox = true) => {
    setIsDragging(true);

    if (isFromToolbox) {
      // When dragging from the toolbox, create a new element
      const newElement = {
        ...element,
        id: `element-${Date.now()}`,
        props: { ...element.defaultProps },
      };

      setDraggedElement(newElement);
    } else {
      // When reordering existing elements
      setDraggedElement(element);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedElement(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();

    const newElements = [...elements];

    if (draggedElement) {
      // Find if we're reordering an existing element
      const existingIndex = elements.findIndex(
        (el) => el.id === draggedElement.id,
      );

      if (existingIndex >= 0) {
        // Remove from old position
        newElements.splice(existingIndex, 1);

        // Adjust target index if needed
        const adjustedTargetIndex =
          existingIndex < targetIndex ? targetIndex - 1 : targetIndex;

        // Insert at new position
        newElements.splice(adjustedTargetIndex, 0, draggedElement);
      } else {
        // Insert new element
        newElements.splice(targetIndex, 0, draggedElement);
      }

      setElements(newElements);
    }

    setDraggedElement(null);
    setDragOverIndex(null);
    setIsDragging(false);
  };

  const handleElementDelete = (elementId) => {
    setElements(elements.filter((element) => element.id !== elementId));
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement(null);
    }
  };

  const handleElementUpdate = (elementId, updates) => {
    const newElements = elements.map((element) =>
      element.id === elementId
        ? { ...element, props: { ...element.props, ...updates } }
        : element,
    );

    setElements(newElements);

    // Also update selectedElement if it's the one being edited
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement({
        ...selectedElement,
        props: { ...selectedElement.props, ...updates },
      });
    }
  };

  const handleElementSelect = (element) => {
    setSelectedElement(element);
    setActiveTab("properties");
  };

  const handleSaveForm = () => {
    if (!formTitle.trim()) {
      setIsTitleMissingModalOpen(true);

      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 1200);
    }, 1200);
    // In a real implementation, this would save to a database
    // For now, we'll just show a success message and redirect
    // alert(`Form "${formTitle}" saved successfully!`);
    // router.push('/dashboard');
  };

  const handlePublishForm = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsSuccessModalOpen(true);
    }, 1500);
    setFormStatus("published");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(dummyLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1200);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);

      setHeaderImage(url);
    }
  };

  // Render the preview of a form element (interactive for preview)
  const renderElementPreview = (element, previewMode = false) => {
    const question = element.props.question;
    const questionNode = question ? (
      <div className="mb-1 text-base font-semibold text-gray-900">
        {question}
      </div>
    ) : null;

    if (!previewMode) {
      switch (element.type) {
        case "text":
          return (
            <>
              {questionNode}
              <Input
                className="w-full"
                helperText={element.props.helpText}
                isRequired={element.props.required}
                label={element.props.label}
                placeholder={element.props.placeholder}
              />
            </>
          );
        case "textarea":
          return (
            <>
              {questionNode}
              <Textarea
                className="w-full"
                helperText={element.props.helpText}
                isRequired={element.props.required}
                label={element.props.label}
                placeholder={element.props.placeholder}
                rows={element.props.rows}
              />
            </>
          );
        case "select":
          return (
            <>
              {questionNode}
              <Select
                className="w-full"
                helperText={element.props.helpText}
                isRequired={element.props.required}
                label={element.props.label}
                placeholder="Select an option"
              >
                {element.props.options.map((option, i) => (
                  <SelectItem key={i} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>
            </>
          );
        case "radio":
          return (
            <>
              {questionNode}
              <RadioGroup
                className="w-full"
                defaultValue={element.props.options[0]}
                description={element.props.helpText}
                isRequired={element.props.required}
                label={element.props.label}
              >
                {element.props.options.map((option, i) => (
                  <Radio key={i} value={option}>
                    {option}
                  </Radio>
                ))}
              </RadioGroup>
            </>
          );
        case "checkbox":
          return (
            <>
              {questionNode}
              <CheckboxGroup
                className="w-full"
                defaultValue={[]}
                description={element.props.helpText}
                isRequired={element.props.required}
                label={element.props.label}
              >
                {element.props.options.map((option, i) => (
                  <Checkbox key={i} value={option}>
                    {option}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </>
          );
        case "date":
          return (
            <>
              {questionNode}
              <DatePicker
                className="w-full max-w-xs"
                description={element.props.helpText}
                isRequired={element.props.required}
                label={element.props.label}
              />
            </>
          );
        case "file":
          return (
            <>
              {questionNode}
              <div className="w-full">
                <p className="text-sm font-medium mb-2">
                  {element.props.label}
                  {element.props.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </p>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Icon
                      className="mb-2"
                      icon="solar:cloud-upload-linear"
                      width={24}
                    />
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum file size: {element.props.maxSize}
                    </p>
                  </div>
                  <input className="hidden" type="file" />
                </label>
                {element.props.helpText && (
                  <p className="text-xs text-gray-500 mt-1">
                    {element.props.helpText}
                  </p>
                )}
              </div>
            </>
          );
        case "rating":
          return (
            <>
              {questionNode}
              <div className="w-full">
                <p className="text-sm font-medium mb-2">
                  {element.props.label}
                  {element.props.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </p>
                <div className="flex items-center">
                  {Array.from({ length: element.props.maxRating }, (_, i) => (
                    <Icon
                      key={i}
                      className="cursor-pointer text-gray-400 hover:text-yellow-400"
                      icon="solar:star-linear"
                      width={24}
                    />
                  ))}
                </div>
                {element.props.helpText && (
                  <p className="text-xs text-gray-500 mt-1">
                    {element.props.helpText}
                  </p>
                )}
              </div>
            </>
          );
        default:
          return <div>Unknown element type</div>;
      }
    } else {
      // Interactive preview mode
      switch (element.type) {
        case "text":
          return (
            <>
              {questionNode}
              <Input
                className="w-full"
                helperText={element.props.helpText}
                isRequired={element.props.required}
                label={element.props.label}
                placeholder={element.props.placeholder}
                value={previewAnswers[element.id] || ""}
                onChange={(e) =>
                  setPreviewAnswers((a) => ({
                    ...a,
                    [element.id]: e.target.value,
                  }))
                }
              />
            </>
          );
        case "textarea":
          return (
            <>
              {questionNode}
              <Textarea
                className="w-full"
                helperText={element.props.helpText}
                isRequired={element.props.required}
                label={element.props.label}
                placeholder={element.props.placeholder}
                rows={element.props.rows}
                value={previewAnswers[element.id] || ""}
                onChange={(e) =>
                  setPreviewAnswers((a) => ({
                    ...a,
                    [element.id]: e.target.value,
                  }))
                }
              />
            </>
          );
        case "select":
          return (
            <>
              {questionNode}
              <Select
                className="w-full"
                helperText={element.props.helpText}
                isRequired={element.props.required}
                label={element.props.label}
                placeholder="Select an option"
                selectedKeys={
                  previewAnswers[element.id] ? [previewAnswers[element.id]] : []
                }
                onSelectionChange={(keys) =>
                  setPreviewAnswers((a) => ({
                    ...a,
                    [element.id]: Array.from(keys)[0],
                  }))
                }
              >
                {element.props.options.map((option, i) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>
            </>
          );
        case "radio":
          return (
            <>
              {questionNode}
              <RadioGroup
                className="w-full"
                description={element.props.helpText}
                isRequired={element.props.required}
                label={element.props.label}
                value={previewAnswers[element.id] || element.props.options[0]}
                onValueChange={(val) =>
                  setPreviewAnswers((a) => ({ ...a, [element.id]: val }))
                }
              >
                {element.props.options.map((option, i) => (
                  <Radio key={option} value={option}>
                    {option}
                  </Radio>
                ))}
              </RadioGroup>
            </>
          );
        case "checkbox":
          return (
            <>
              {questionNode}
              <CheckboxGroup
                className="w-full"
                description={element.props.helpText}
                isRequired={element.props.required}
                label={element.props.label}
                value={previewAnswers[element.id] || []}
                onValueChange={(vals) =>
                  setPreviewAnswers((a) => ({ ...a, [element.id]: vals }))
                }
              >
                {element.props.options.map((option, i) => (
                  <Checkbox key={option} value={option}>
                    {option}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </>
          );
        case "date":
          return (
            <>
              {questionNode}
              <DatePicker
                className="w-full max-w-xs"
                description={element.props.helpText}
                isRequired={element.props.required}
                label={element.props.label}
                value={previewAnswers[element.id] || null}
                onChange={(val) =>
                  setPreviewAnswers((a) => ({ ...a, [element.id]: val }))
                }
              />
            </>
          );
        case "file":
          return (
            <>
              {questionNode}
              <div className="w-full">
                <p className="text-sm font-medium mb-2">
                  {element.props.label}
                  {element.props.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </p>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Icon
                      className="mb-2"
                      icon="solar:cloud-upload-linear"
                      width={24}
                    />
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum file size: {element.props.maxSize}
                    </p>
                  </div>
                  <input
                    className="hidden"
                    type="file"
                    onChange={(e) =>
                      setPreviewAnswers((a) => ({
                        ...a,
                        [element.id]: e.target.files[0],
                      }))
                    }
                  />
                </label>
                {element.props.helpText && (
                  <p className="text-xs text-gray-500 mt-1">
                    {element.props.helpText}
                  </p>
                )}
                {previewAnswers[element.id] &&
                  typeof previewAnswers[element.id] === "object" && (
                    <div className="mt-2 text-xs text-green-600">
                      {previewAnswers[element.id].name}
                    </div>
                  )}
              </div>
            </>
          );
        case "rating": {
          const rating = previewAnswers[element.id] || 0;

          return (
            <>
              {questionNode}
              <div className="w-full">
                <p className="text-sm font-medium mb-2">
                  {element.props.label}
                  {element.props.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </p>
                <div className="flex items-center">
                  {Array.from({ length: element.props.maxRating }, (_, i) => (
                    <Icon
                      key={i}
                      className={
                        "cursor-pointer transition-colors " +
                        (i < rating
                          ? "text-yellow-400"
                          : "text-gray-300 hover:text-yellow-400")
                      }
                      icon="solar:star-bold"
                      width={28}
                      onClick={() =>
                        setPreviewAnswers((a) => ({
                          ...a,
                          [element.id]: i + 1,
                        }))
                      }
                    />
                  ))}
                </div>
                {element.props.helpText && (
                  <p className="text-xs text-gray-500 mt-1">
                    {element.props.helpText}
                  </p>
                )}
              </div>
            </>
          );
        }
        default:
          return <div>Unknown element type</div>;
      }
    }
  };

  const renderElementProperties = () => {
    if (!selectedElement)
      return (
        <div className="p-4 text-center text-gray-500">
          Select a form element to edit its properties
        </div>
      );

    return (
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-medium">
          {selectedElement.label} Properties
        </h3>
        {/* Question field for all elements */}
        <Input
          label="Question"
          value={selectedElement.props.question || ""}
          onChange={(e) =>
            handleElementUpdate(selectedElement.id, {
              question: e.target.value,
            })
          }
        />
        <Input
          label="Label"
          value={selectedElement.props.label}
          onChange={(e) =>
            handleElementUpdate(selectedElement.id, { label: e.target.value })
          }
        />

        {(selectedElement.type === "text" ||
          selectedElement.type === "textarea") && (
          <Input
            label="Placeholder"
            value={selectedElement.props.placeholder}
            onChange={(e) =>
              handleElementUpdate(selectedElement.id, {
                placeholder: e.target.value,
              })
            }
          />
        )}

        <Input
          label="Help Text"
          value={selectedElement.props.helpText}
          onChange={(e) =>
            handleElementUpdate(selectedElement.id, {
              helpText: e.target.value,
            })
          }
        />

        <div className="flex items-center justify-between">
          <span>Required</span>
          <Switch
            isSelected={selectedElement.props.required}
            onValueChange={(isSelected) =>
              handleElementUpdate(selectedElement.id, { required: isSelected })
            }
          />
        </div>

        {selectedElement.type === "textarea" && (
          <Input
            label="Rows"
            max={10}
            min={1}
            type="number"
            value={selectedElement.props.rows}
            onChange={(e) =>
              handleElementUpdate(selectedElement.id, {
                rows: Number(e.target.value),
              })
            }
          />
        )}

        {(selectedElement.type === "select" ||
          selectedElement.type === "radio" ||
          selectedElement.type === "checkbox") && (
          <div>
            <p className="text-sm font-medium mb-2">Options</p>
            {selectedElement.props.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  className="flex-1 mr-2"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...selectedElement.props.options];

                    newOptions[index] = e.target.value;
                    handleElementUpdate(selectedElement.id, {
                      options: newOptions,
                    });
                  }}
                />
                <Button
                  isIconOnly
                  color="danger"
                  variant="light"
                  onPress={() => {
                    const newOptions = selectedElement.props.options.filter(
                      (_, i) => i !== index,
                    );

                    handleElementUpdate(selectedElement.id, {
                      options: newOptions,
                    });
                  }}
                >
                  <Icon icon="solar:trash-bin-trash-linear" />
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              variant="flat"
              onPress={() => {
                const newOptions = [
                  ...selectedElement.props.options,
                  `Option ${selectedElement.props.options.length + 1}`,
                ];

                handleElementUpdate(selectedElement.id, {
                  options: newOptions,
                });
              }}
            >
              Add Option
            </Button>
          </div>
        )}

        {selectedElement.type === "rating" && (
          <Input
            label="Max Rating"
            max={10}
            min={1}
            type="number"
            value={selectedElement.props.maxRating}
            onChange={(e) =>
              handleElementUpdate(selectedElement.id, {
                maxRating: Number(e.target.value),
              })
            }
          />
        )}

        <div className="pt-4">
          <Button
            className="w-full"
            color="danger"
            variant="light"
            onPress={() => handleElementDelete(selectedElement.id)}
          >
            Delete Element
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            isIconOnly
            className="rounded-full"
            variant="light"
            onPress={() => router.push("/dashboard")}
          >
            <Icon icon="solar:arrow-left-linear" width={20} />
          </Button>
          <div className="h-6 w-[1px] bg-gray-300" />
          <Badge
            color={formStatus === "draft" ? "warning" : "success"}
            size="sm"
            variant="flat"
          >
            {formStatus === "draft" ? "Draft" : "Published"}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <Button
            radius="full"
            size="sm"
            startContent={<Icon icon="solar:eye-linear" />}
            variant="flat"
            onPress={() => setIsPreviewModalOpen(true)}
          >
            Preview
          </Button>
          <Button
            isDisabled={isSaving}
            radius="full"
            size="sm"
            startContent={
              isSaving ? (
                <Spinner color="success" size="sm" />
              ) : (
                <Icon icon="solar:diskette-linear" />
              )
            }
            variant="bordered"
            onPress={handleSaveForm}
          >
            {isSaving ? (
              "Saving..."
            ) : saveSuccess ? (
              <span className="text-green-600 font-semibold">Saved</span>
            ) : (
              "Save"
            )}
          </Button>
          <Button
            color="primary"
            isDisabled={isPublishing}
            radius="full"
            size="sm"
            startContent={
              isPublishing ? (
                <Spinner color="white" size="sm" />
              ) : (
                <Icon icon="solar:upload-linear" />
              )
            }
            onPress={handlePublishForm}
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 h-[calc(100vh-65px)]">
        {/* Left Sidebar - Elements Library */}
        <div className="w-72 border-r border-gray-200 bg-white h-full overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-base font-medium">Form Elements</h3>
            <p className="text-xs text-gray-500">
              Drag elements onto your form
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                BASIC ELEMENTS
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {formElements.slice(0, 4).map((element, index) => (
                  <div
                    key={index}
                    draggable
                    className="border border-gray-200 bg-white rounded-lg p-3 flex flex-col items-center cursor-move hover:border-blue-400 hover:bg-blue-50/50 transition-colors shadow-sm"
                    onDragEnd={handleDragEnd}
                    onDragStart={(e) => handleDragStart(e, element)}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                      <Icon
                        className="text-blue-500"
                        icon={
                          element.icon && element.icon.length > 0
                            ? element.icon
                            : "solar:widget-add-bold"
                        }
                        width={20}
                      />
                    </div>
                    <span className="text-xs font-medium">{element.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                ADVANCED INPUTS
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {formElements.slice(4).map((element, index) => (
                  <div
                    key={index + 4}
                    draggable
                    className="border border-gray-200 bg-white rounded-lg p-3 flex flex-col items-center cursor-move hover:border-blue-400 hover:bg-blue-50/50 transition-colors shadow-sm"
                    onDragEnd={handleDragEnd}
                    onDragStart={(e) => handleDragStart(e, element)}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                      <Icon
                        className="text-blue-500"
                        icon={
                          element.icon && element.icon.length > 0
                            ? element.icon
                            : "solar:widget-add-bold"
                        }
                        width={20}
                      />
                    </div>
                    <span className="text-xs font-medium">{element.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Form Builder */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100 flex justify-center">
          <Card className="w-full max-w-3xl mx-auto shadow-md">
            {/* Header Image Selection */}
            <div className="relative">
              <div
                className="h-48 w-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center cursor-pointer group overflow-hidden relative rounded-xl"
                role="button"
                tabIndex={0}
                onClick={() =>
                  !headerImage &&
                  document.getElementById("header-image-upload").click()
                }
                onKeyDown={(e) => {
                  if (!headerImage && (e.key === "Enter" || e.key === " ")) {
                    document.getElementById("header-image-upload").click();
                  }
                }}
              >
                {headerImage ? (
                  <img
                    alt="Header"
                    className="h-48 w-full object-cover rounded-t-xl mb-4 rounded-xl"
                    src={headerImage}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full absolute inset-0 z-10">
                    <Icon
                      className="mb-2 text-white"
                      icon="solar:gallery-linear"
                      width={32}
                    />
                    <p className="text-sm text-white">Add header image</p>
                  </div>
                )}
                <input
                  accept="image/*"
                  className="hidden"
                  id="header-image-upload"
                  type="file"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            {/* Inline Title and Description Writer */}
            <CardHeader className="border-b border-gray-100 pb-4 pt-6 px-6 flex-col items-start">
              <Input
                className="mb-2 text-2xl font-bold bg-transparent border-none shadow-none px-0 focus:ring-0 focus:border-blue-300"
                placeholder="Form Title"
                size="lg"
                value={formTitle}
                variant="borderless"
                onChange={(e) => setFormTitle(e.target.value)}
              />
              <Textarea
                className="text-gray-600 bg-transparent border-none shadow-none px-0 focus:ring-0 focus:border-blue-300"
                minRows={1}
                placeholder="Form Description"
                size="sm"
                value={formDescription}
                variant="borderless"
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </CardHeader>

            <CardBody className="px-6 py-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              {elements.length === 0 ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
                  onDragLeave={() => setDragOverIndex(null)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverIndex(0);
                  }}
                  onDrop={(e) => handleDrop(e, 0)}
                >
                  <div className="text-gray-500">
                    <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                      <Icon
                        className="text-blue-500"
                        icon="solar:add-square-linear"
                        width={32}
                      />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      Start building your form
                    </h3>
                    <p>Drag and drop elements from the sidebar</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {elements.map((element, index) => (
                    <React.Fragment key={element.id}>
                      {/* Drop zone before every element when dragging */}
                      {isDragging && (
                        <div
                          className={`h-8 border-2 border-dashed rounded-lg mb-2 flex items-center justify-center transition-all ${dragOverIndex === index ? "border-blue-400 bg-blue-50/40" : "border-gray-200 bg-white"}`}
                          style={{ cursor: "pointer" }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOverIndex(index);
                          }}
                          onDrop={(e) => handleDrop(e, index)}
                        >
                          <p
                            className={`text-xs ${dragOverIndex === index ? "text-blue-500" : "text-gray-400"}`}
                          >
                            Drop here
                          </p>
                        </div>
                      )}
                      <Button
                        draggable
                        className={`border rounded-lg p-4 transition-all text-left w-full h-auto min-h-[64px] ${
                          selectedElement?.id === element.id
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                        variant="light"
                        onDragEnd={handleDragEnd}
                        onDragStart={(e) => handleDragStart(e, element, false)}
                        onPress={() => handleElementSelect(element)}
                      >
                        <div className="relative w-full">
                          {selectedElement?.id === element.id && (
                            <div className="absolute -top-3 -right-3 flex gap-1">
                              <Button
                                isIconOnly
                                className="bg-white shadow-sm rounded-full"
                                size="sm"
                                variant="flat"
                                onPress={() => handleElementDelete(element.id)}
                              >
                                <Icon
                                  icon="solar:trash-bin-trash-linear"
                                  width={16}
                                />
                              </Button>
                            </div>
                          )}
                          {renderElementPreview(element)}
                        </div>
                      </Button>
                    </React.Fragment>
                  ))}
                  {/* Always show end drop zone when dragging */}
                  {isDragging && (
                    <div
                      className={`h-16 border-2 border-dashed rounded-lg mt-2 flex items-center justify-center transition-all ${dragOverIndex === elements.length ? "border-blue-400 bg-blue-50/40" : "border-gray-200 bg-white"}`}
                      style={{ cursor: "pointer" }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverIndex(elements.length);
                      }}
                      onDrop={(e) => handleDrop(e, elements.length)}
                    >
                      <p
                        className={`text-base font-medium ${dragOverIndex === elements.length ? "text-blue-500" : "text-gray-400"}`}
                      >
                        Drop here to add to the end
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Right Sidebar - Properties & Settings */}
        <div className="w-80 border-l border-gray-200 bg-white h-full overflow-hidden flex flex-col">
          <Tabs
            fullWidth
            aria-label="Form builder tabs"
            classNames={{
              tabList:
                "bg-gray-50/50 p-1 flex gap-2 rounded-lg border border-gray-200 shadow-sm",
              cursor: "bg-indigo-100 text-indigo-700 shadow-sm",
              tab: "py-2.5 font-medium text-sm flex items-center gap-2 rounded-lg transition-colors",
            }}
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
          >
            <Tab
              key="properties"
              title={
                <div className="flex items-center gap-2">
                  <Icon
                    className={
                      activeTab === "properties"
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }
                    icon="solar:slider-horizontal-bold"
                    width={18}
                  />
                  <span>Properties</span>
                </div>
              }
            />
            <Tab
              key="settings"
              title={
                <div className="flex items-center gap-2">
                  <Icon
                    className={
                      activeTab === "settings"
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }
                    icon="solar:settings-bold"
                    width={18}
                  />
                  <span>Settings</span>
                </div>
              }
            />
          </Tabs>

          <div className="flex-1 overflow-y-auto">
            {activeTab === "properties" && (
              <div className="p-5 space-y-5">
                {!selectedElement ? (
                  <div className="text-center p-10">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Icon
                        className="text-gray-400"
                        icon="solar:cursor-bold"
                        width={24}
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No element selected
                    </h3>
                    <p className="text-sm text-gray-500">
                      Select an element from your form to edit its properties
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <Icon
                            className="text-blue-500"
                            icon={
                              formElements.find(
                                (e) => e.type === selectedElement.type,
                              )?.icon
                            }
                            width={18}
                          />
                        </div>
                        <h3 className="text-lg font-medium">
                          {selectedElement.label} Properties
                        </h3>
                      </div>

                      <Card className="mb-5">
                        <CardBody className="gap-4">
                          <Input
                            label="Question"
                            size="sm"
                            value={selectedElement.props.question || ""}
                            variant="bordered"
                            onChange={(e) =>
                              handleElementUpdate(selectedElement.id, {
                                question: e.target.value,
                              })
                            }
                          />
                          <Input
                            label="Label"
                            size="sm"
                            value={selectedElement.props.label}
                            variant="bordered"
                            onChange={(e) =>
                              handleElementUpdate(selectedElement.id, {
                                label: e.target.value,
                              })
                            }
                          />

                          {(selectedElement.type === "text" ||
                            selectedElement.type === "textarea") && (
                            <Input
                              label="Placeholder"
                              size="sm"
                              value={selectedElement.props.placeholder}
                              variant="bordered"
                              onChange={(e) =>
                                handleElementUpdate(selectedElement.id, {
                                  placeholder: e.target.value,
                                })
                              }
                            />
                          )}

                          <Input
                            label="Help Text"
                            size="sm"
                            value={selectedElement.props.helpText}
                            variant="bordered"
                            onChange={(e) =>
                              handleElementUpdate(selectedElement.id, {
                                helpText: e.target.value,
                              })
                            }
                          />
                        </CardBody>
                      </Card>

                      <Card className="mb-5">
                        <CardBody>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">
                                Required field
                              </p>
                              <p className="text-xs text-gray-500">
                                Users must fill out this field
                              </p>
                            </div>
                            <Switch
                              isSelected={selectedElement.props.required}
                              size="sm"
                              onValueChange={(isSelected) =>
                                handleElementUpdate(selectedElement.id, {
                                  required: isSelected,
                                })
                              }
                            />
                          </div>
                        </CardBody>
                      </Card>

                      {selectedElement.type === "textarea" && (
                        <Card className="mb-5">
                          <CardBody>
                            <Input
                              label="Rows"
                              max={10}
                              min={1}
                              size="sm"
                              type="number"
                              value={selectedElement.props.rows}
                              onChange={(e) =>
                                handleElementUpdate(selectedElement.id, {
                                  rows: Number(e.target.value),
                                })
                              }
                            />
                          </CardBody>
                        </Card>
                      )}

                      {(selectedElement.type === "select" ||
                        selectedElement.type === "radio" ||
                        selectedElement.type === "checkbox") && (
                        <Card className="mb-5">
                          <CardHeader>
                            <h4 className="text-sm font-medium">Options</h4>
                          </CardHeader>
                          <CardBody className="gap-2">
                            {selectedElement.props.options.map(
                              (option, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <Input
                                    className="flex-1"
                                    size="sm"
                                    startContent={
                                      <span className="text-xs text-gray-500">
                                        {index + 1}
                                      </span>
                                    }
                                    value={option}
                                    variant="bordered"
                                    onChange={(e) => {
                                      const newOptions = [
                                        ...selectedElement.props.options,
                                      ];

                                      newOptions[index] = e.target.value;
                                      handleElementUpdate(selectedElement.id, {
                                        options: newOptions,
                                      });
                                    }}
                                  />
                                  <Button
                                    isIconOnly
                                    color="danger"
                                    size="sm"
                                    variant="light"
                                    onPress={() => {
                                      const newOptions =
                                        selectedElement.props.options.filter(
                                          (_, i) => i !== index,
                                        );

                                      handleElementUpdate(selectedElement.id, {
                                        options: newOptions,
                                      });
                                    }}
                                  >
                                    <Icon icon="solar:trash-bin-trash-linear" />
                                  </Button>
                                </div>
                              ),
                            )}
                            <Button
                              className="mt-2"
                              color="primary"
                              size="sm"
                              startContent={
                                <Icon icon="solar:add-circle-linear" />
                              }
                              variant="flat"
                              onPress={() => {
                                const newOptions = [
                                  ...selectedElement.props.options,
                                  `Option ${selectedElement.props.options.length + 1}`,
                                ];

                                handleElementUpdate(selectedElement.id, {
                                  options: newOptions,
                                });
                              }}
                            >
                              Add Option
                            </Button>
                          </CardBody>
                        </Card>
                      )}

                      {selectedElement.type === "rating" && (
                        <Card className="mb-5">
                          <CardBody>
                            <Input
                              label="Maximum Rating"
                              max={10}
                              min={1}
                              size="sm"
                              type="number"
                              value={selectedElement.props.maxRating}
                              onChange={(e) =>
                                handleElementUpdate(selectedElement.id, {
                                  maxRating: Number(e.target.value),
                                })
                              }
                            />
                          </CardBody>
                        </Card>
                      )}

                      <div className="pt-4">
                        <Button
                          className="w-full"
                          color="danger"
                          startContent={
                            <Icon icon="solar:trash-bin-trash-linear" />
                          }
                          variant="flat"
                          onPress={() =>
                            handleElementDelete(selectedElement.id)
                          }
                        >
                          Delete Element
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="p-5 space-y-5">
                <Card>
                  <CardHeader>
                    <h3 className="text-sm font-medium">Form Details</h3>
                  </CardHeader>
                  <CardBody className="gap-4">
                    <Textarea
                      label="Form Description"
                      placeholder="Add a description for your form"
                      rows={3}
                      size="sm"
                      value={formDescription}
                      variant="bordered"
                      onChange={(e) => setFormDescription(e.target.value)}
                    />
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-sm font-medium">Form Settings</h3>
                  </CardHeader>
                  <CardBody className="gap-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          Allow multiple submissions
                        </p>
                        <p className="text-xs text-gray-500">
                          Users can submit the form multiple times
                        </p>
                      </div>
                      <Switch
                        isSelected={formSettings.allowMultipleSubmissions}
                        size="sm"
                        onValueChange={(isSelected) =>
                          setFormSettings({
                            ...formSettings,
                            allowMultipleSubmissions: isSelected,
                          })
                        }
                      />
                    </div>

                    <Divider />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          Require email verification
                        </p>
                        <p className="text-xs text-gray-500">
                          Users must verify their email to submit
                        </p>
                      </div>
                      <Switch
                        isSelected={formSettings.requireEmailVerification}
                        size="sm"
                        onValueChange={(isSelected) =>
                          setFormSettings({
                            ...formSettings,
                            requireEmailVerification: isSelected,
                          })
                        }
                      />
                    </div>

                    <Divider />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Close responses</p>
                        <p className="text-xs text-gray-500">
                          No new responses will be accepted
                        </p>
                      </div>
                      <Switch
                        isSelected={formSettings.responsesClosed}
                        size="sm"
                        onValueChange={(isSelected) =>
                          setFormSettings({
                            ...formSettings,
                            responsesClosed: isSelected,
                          })
                        }
                      />
                    </div>

                    <Divider />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          Notify on submission
                        </p>
                        <p className="text-xs text-gray-500">
                          Receive email notifications for new responses
                        </p>
                      </div>
                      <Switch
                        isSelected={formSettings.notifyOnSubmission}
                        size="sm"
                        onValueChange={(isSelected) =>
                          setFormSettings({
                            ...formSettings,
                            notifyOnSubmission: isSelected,
                          })
                        }
                      />
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-sm font-medium">Theme</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-2 gap-3">
                      {themes.map((theme) => (
                        <Button
                          key={theme.name}
                          className={`border rounded-lg p-3 flex flex-col items-center transition-all shadow-none ${
                            selectedTheme === theme.name
                              ? "border-blue-500 bg-blue-50/50 shadow-sm"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          variant="light"
                          onPress={() => setSelectedTheme(theme.name)}
                        >
                          <div className="w-full h-12 rounded-md mb-2 bg-gray-100">
                            <div className="h-2 w-24 rounded-full bg-blue-500 mt-2 ml-2" />
                            <div className="h-2 w-16 rounded-full bg-purple-500 mt-1 ml-6" />
                          </div>
                          <span className="text-xs font-medium">
                            {theme.name}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewModalOpen}
        scrollBehavior="inside"
        size="3xl"
        onOpenChange={(open) => {
          setIsPreviewModalOpen(open);
          if (!open) {
            setPreviewPage(0);
            setPreviewSubmitted(false);
            setPreviewAnswers({});
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:eye-linear" />
                  <span>Form Preview</span>
                </div>
              </ModalHeader>
              <ModalBody className="p-6">
                <Card className="w-full shadow-sm">
                  <CardBody className="px-6 py-6">
                    {elements.length === 0 ? (
                      <div className="text-center p-10 text-gray-500">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Icon
                            className="text-gray-400"
                            icon="solar:document-linear"
                            width={30}
                          />
                        </div>
                        <h3 className="text-lg font-medium mb-1">
                          Your form is empty
                        </h3>
                        <p className="text-sm">
                          Add some elements to see a preview
                        </p>
                      </div>
                    ) : previewSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-16">
                        <Icon
                          className="text-green-500 mb-4"
                          icon="solar:check-circle-bold"
                          width={48}
                        />
                        <h2 className="text-2xl font-bold mb-2">
                          Thank you for submitting!
                        </h2>
                        <p className="text-gray-600">
                          Your response has been recorded.
                        </p>
                      </div>
                    ) : (
                      <form
                        className="space-y-6"
                        onSubmit={(e) => {
                          e.preventDefault();
                          setPreviewSubmitted(true);
                        }}
                      >
                        {/* Header image, title, and description are now inside the scrollable form */}
                        {headerImage ? (
                          <img
                            alt="Header"
                            className="h-48 w-full object-cover rounded-t-xl mb-4"
                            src={headerImage}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-48 w-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4 rounded-xl">
                            <Icon
                              className="mb-2 text-white"
                              icon="solar:gallery-linear"
                              width={32}
                            />
                            <p className="text-sm text-white">
                              Add header image
                            </p>
                          </div>
                        )}
                        <h1 className="text-3xl font-extrabold">
                          {formTitle || "Untitled Form"}
                        </h1>
                        {formDescription && (
                          <p className="text-gray-500 mb-4">
                            {formDescription}
                          </p>
                        )}
                        {elements.map((element) => (
                          <div key={element.id} className="">
                            {renderElementPreview(element, true)}
                          </div>
                        ))}
                        <Button
                          className="mt-6 w-full"
                          color="primary"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </form>
                    )}
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  Close Preview
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Success Modal after Publish */}
      <Modal
        isOpen={isSuccessModalOpen}
        size="md"
        onOpenChange={setIsSuccessModalOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b flex items-center gap-2">
                <Icon
                  className="text-green-500"
                  icon="solar:check-circle-bold"
                  width={28}
                />
                <span>Form Published!</span>
              </ModalHeader>
              <ModalBody className="p-6 text-center">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-lg font-semibold text-gray-800">
                    Your form is live 🎉
                  </p>
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 mt-2">
                    <span className="text-blue-600 font-mono text-sm select-all">
                      {dummyLink}
                    </span>
                    <Tooltip
                      content={copySuccess ? "Copied!" : "Copy link"}
                      placement="top"
                    >
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={handleCopyLink}
                      >
                        <Icon
                          className={
                            copySuccess ? "text-green-500" : "text-gray-500"
                          }
                          icon={
                            copySuccess
                              ? "solar:check-bold"
                              : "solar:copy-linear"
                          }
                          width={20}
                        />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Title Missing Modal */}
      <Modal
        isOpen={isTitleMissingModalOpen}
        size="sm"
        onOpenChange={setIsTitleMissingModalOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b flex items-center gap-2">
                <Icon
                  className="text-yellow-500"
                  icon="solar:info-circle-bold"
                  width={24}
                />
                <span>Missing Title</span>
              </ModalHeader>
              <ModalBody className="p-6 text-center">
                <p className="text-lg text-gray-800">
                  Please add a title to your form before saving.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
