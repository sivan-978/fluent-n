"use client";

import { Trash2, X, AlertTriangle } from "lucide-react";



export default function DeleteFlashcardSetsModal({ setName, selectedCount, onCancel, onConfirm, isDeleting }) {
    const isSingleSet = selectedCount === 1;


    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

            <div className="flex flex-col rounded-3xl bg-[#fff8f0] p-8 shadow-2xl">

                {/* icon */}
                <div className="flex justify-center mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                </div>


                {/* text */}
                <div className="text-center">

                    <h2 className="text-xl font-bold text-[#673407]">
                        {isSingleSet && setName
                            ? `Delete "${setName}"?`
                            : isSingleSet
                                ? "Delete 1 set?"
                                : `Delete ${selectedCount} sets?`
                        }
                    </h2>

                    <p className="mt-1 text-sm text-[#965c09]">
                        {isSingleSet
                            ? "Are you sure you want to delete this flashcard set?"
                            : `Are you sure you want to delete ${selectedCount} selected flashcard sets?`
                        }
                    </p>

                    <p className="mt-1 text-sm text-red-500">
                        This action cannot be undone.
                    </p>

                </div>


                {/* buttons */}
                <div className="mt-8 flex gap-4">

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#965c09]/30 px-2 py-2 font-semibold text-[#965c09] hover:bg-[#fbe9d0] transition-colors cursor-pointer"
                    >
                        <X className="h-4 w-4" />
                        Cancel
                    </button>


                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-2 py-2 font-semibold text-white hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >

                        <Trash2 className="h-4 w-4" />
                        {isDeleting
                            ? "Deleting..."
                            : `Delete ${selectedCount}`
                        }
                    </button>

                </div>
            </div>
        </div>
    );
}
