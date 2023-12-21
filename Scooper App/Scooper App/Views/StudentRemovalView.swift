//
//  StudentRemovalView.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/29/23.
//

import SwiftUI

struct StudentRemovalView: View {
    
    @StateObject private var vm = ScooperViewModel()
    @State private var id: String = ""
    @State private var studentID = ""
    @State private var isPresented = false
    
    var body: some View {
        VStack {
            
            Text("Enter student ID to remove")
            TextField("Student ID", text: $id)
                .modernRoundField()
                .padding(.bottom)
            
            Text("Warning: Deletion is a permant action. Removes all data associated with the student.")
                .font(.callout)
                .foregroundStyle(.red)
            
            Spacer()
            
            Button {
                studentID = id
                Task {
                    do {
                        try await vm.removeStudent(studentID: studentID)
                    } catch {
                        isPresented = true
                    }
                }
                id = ""
            } label: {
                Text("Delete")
            }
            .font(.headline)
            .frame(height: 55)
            .frame(minWidth: 360)
            .foregroundColor(.white)
            .background(Color.red)
            .clipShape(Rectangle())
            .cornerRadius(10)
        }
        .alert("Deletion failed", isPresented: $isPresented, actions: {
            Button("OK") {
                isPresented = false
            }
        }, message: {
            Text("Please check the student's ID and try again.")
        })
        .padding()
        .navigationTitle("Delete Student")
    }
}

#Preview {
    StudentRemovalView()
}
